const authModel = require("../models/auth.js");
const bycript = require('bcryptjs');
const jwt = require('jsonwebtoken');


const registerUser = async (req, res, next) => {
    const body = req.body;
    if(!body.user_name || !body.user_id || !body.password || !body.pass_init || !body.uid || !body.role || !body.org_id) {
        res.status(400).json({
            message: "mohon isi data dengan benar !"
        });
    }
    const hashedPassword =   bycript.hashSync( body.password, 10 );
    
    try {
        await authModel.registerUser(body, hashedPassword)
        res.json({

            message:"berhasil daftar !"
        })
    } catch (error) {
        if(error.errno == 1062){
            res.status(409).json({
                message : "user is already used !"
            })
        }
        res.json({
            message : error.message
        })
        
    }
}

const signInUser = async ( req, res, next) => {
    const {body} = req;
    try {
       const [getUser] = await authModel.signIn(body);
       console.log("ini user nya :",getUser);
       const [getPass] = getUser.map(item => {return item.password});       
       if(bycript.compareSync(body.password, getPass)){
        const token = jwt.sign({id : getUser[0].id},'the-super-strong-secrect',{ expiresIn: '1d' });
        const refreshToken = jwt.sign({id : getUser[0].id},'the-super-strong-secrect',{ expiresIn: '40d' });
        res.status(200).json({
            massage : "login succcess",
            data : getUser,
            token : token,
            refreshToken: refreshToken
        })
       }
       
       
       else {
           res.status(401).json({
               message: "invalid password",
           })
       }
       
    } catch (error) {
        res.status(401).json({
            message: error.stack,
            data:"user anda tidak di temukan"

        })
    }
}
const signInUserOutlet = async ( req, res, next) => {
    const {body} = req;
    try {
       const [getUser] = await authModel.signInOutlet(body);
       console.log("ini user nya :",getUser);
       const [getPass] = getUser.map(item => {return item.password});       
       if(bycript.compareSync(body.password, getPass)){
        const token = jwt.sign({id : getUser[0].id},'the-super-strong-secrect',{ expiresIn: '1d' });
        const refreshToken = jwt.sign({id : getUser[0].id},'the-super-strong-secrect',{ expiresIn: '40d' });
        res.status(200).json({
            massage : "login succcess",
            data : getUser,
            token : token,
            refreshToken: refreshToken
        })
       }
       
       
       else {
           res.status(401).json({
               message: "invalid password",
           })
       }
       
    } catch (error) {
        res.status(401).json({
            message: error.stack,
            data:"user anda tidak di temukan"

        })
    }
}

const getUser = async (req, res, next) => {
    if(
    !req.headers.authorization ||
    !req.headers.authorization.startsWith('Bearer') ||
    !req.headers.authorization.split(' ')[1]
     ){
        res.status(401).json({
            message:"authorization failed"
        });
    }
    
    const token = req.headers.authorization.split(' ')[1];
    const decodedId = jwt.verify(token, 'the-super-strong-secrect');
    try {
       const [userInfo] = await authModel.getUserInfo(decodedId.id);
      
       res.json({
        message : userInfo,
        tokenInfo: decodedId,
       });

    } catch (err) {
        res.status(403).json({
            message: "authorization failed please sign In !",
            
        });
    }

}

const refreshToken = async (req, res, next) => {
    if(
    !req.headers.authorization ||
    !req.headers.authorization.startsWith('Bearer') ||
    !req.headers.authorization.split(' ')[1]
     ){
        res.status(401).json({
            message:"authorization failed"
        });
    }
    
    const token = req.headers.authorization.split(' ')[1];
    const decodedId = jwt.verify(token, 'the-super-strong-secrect');
    try {
       const [userInfo] = await authModel.getUserInfo(decodedId.id);  
        const token = jwt.sign({id : userInfo[0].id},'the-super-strong-secrect',{ expiresIn: '1d' });
        const refreshToken = jwt.sign({id : userInfo[0].id},'the-super-strong-secrect',{ expiresIn: '40d' });
       
       res.json({
        message : userInfo,
        token : token,
        refreshToken: refreshToken
       });

    } catch (err) {
        res.status(403).json({
            message: "authorization failed please sign In !",
            data: err.stack
            
        });
    }

}

const signInListKamar = async(req, res, next) => {
    try {
        const [list] = await authModel.getListUserKamar();
        res.status(200).json({
            users: list.map(item => {
                const {user_name, user_id, pass_init, uid, phone} = item;
                return {
                name: user_name,
                user_id: user_id,
                init: pass_init,
                uid: uid,
                phone: phone

            }}),
            message: "all data loaded successfuly !"
        })
    } catch (error) {
        res.status(500).json({
            message: "internal server error !",
            data: error.stack
        })
        
    }
}

const filterUserKamar = async(req, res, next) => {
    const name = req.query.name;
    try {
       const [list] = await authModel.filterListKamar(name);
       res.status(200).json({
        users: list.map(item => {
            const {user_name, user_id, pass_init, uid, phone} = item;
            return {
                name: user_name,
                user_id: user_id,
                init: pass_init,
                uid: uid,
                phone: phone
            }
        }),
        message: "all data loaded successfuly !"
       })

    } catch (error) {
        res.status(500).json({
            message: "internal server error !",
            data: error.stack
        })
    }
}

const deviceToken = async(req, res, next) => {

    const {body} = req;
    if(!body.token || !body.uid){
        res.status(400).json({
            message: "internal server errp"
        })
    }

    if(
        !req.headers.authorization ||
        !req.headers.authorization.startsWith('Bearer') ||
        !req.headers.authorization.split(' ')[1]
         ){
            res.status(401).json({
                message:"authorization failed"
            });
        }
        
        const token = req.headers.authorization.split(' ')[1];
        const decodedId = jwt.verify(token, 'the-super-strong-secrect');

    try {
        await authModel.setDeviceToken(body.token, body.uid);
        res.status(200).json({
            message: "berhasil set token device !",
            data: decodedId
        })
    } catch (error) {
        res.status(500).json({
            message: "internal server error !",
            data: error.stack
        });
        console.log(error.stack);
        
    }

}


const setInitialUser = async(req, res, next) => {
    const {body} = req;
    if(!body.initial_user || !body.uid){
        res.status(400).json({
            message : "mohon isi data dengan benar !"
        })
    }
    try {
        
        await authModel.setInitialUser(body);
        res.status(200).json({
            message: "users initialized successfully!",
        })

    } catch (error) {
        res.status(500).json({
            message: "internal server error !",
            data: error.stack
        });
        console.log(error.stack);
    }
}

const registerKamarDevice = async(req, res, next) => {
    const id = req.query.uid;
    const {body} = req;
    if(!body.key){
        res.status(400).json({
            message: "mohon isi data dengan benar !"
        })
    }
    const dataInput = {
        initial_user: body.initial_user,
        uid:id
    }
    const dataFilter = {
        mac_address: body.key
    }
    try {

     const [devices] = await authModel.signIn(dataFilter);
        if(devices.length !== 0 ){
            await authModel.updateMacAddress(devices[0].uid);
            await authModel.registerKamarDevice(body.key, id);
            await authModel.setInitialUser(dataInput);
        }
            await authModel.registerKamarDevice(body.key, id);
            await authModel.setInitialUser(dataInput);
            res.status(200).json({
                message:"berhasil mendaftarkan device !"
            })
            
    } catch (error) {
        res.status(500).json({
            message: "internal server error !",
            data: error.stack
        });
        console.log(error.stack);
        
    }

}

const registerNumberDevice = async(req, res, next) => {
    const {body} = req;
    if(!body.uid || !body.phone){
        res.status(400).json({
            message: "masukan data dengan benar !",
        })
    }
    const dataInput = {
        phone: body.phone,
        uid: body.uid
    }
    try {
        await authModel.setPhone(dataInput);
        res.status(200).json({
            message: "berhasil menyetel nomor !"
        })
    } catch (error) {
        res.status(500).json({
            message: "internal server error !",
            data: error.stack
        });
        console.log(error.stack);
    }

}

const getUserByUID = async(req, res, next) => {

const id = req.query.uid;
try {
  const [user] =  await authModel.getUserById(id);
  res.status(200).json({
    user: user
  })
} catch (error) {
    res.status(500).json({
        message: "internal server error !",
        data: error.stack,
    });
    console.log(error.stack);
}

}


module.exports = {
    registerUser,
    signInUser,
    getUser,
    refreshToken,
    signInListKamar,
    filterUserKamar,
    deviceToken,
    setInitialUser,
    signInUserOutlet,
    registerKamarDevice,
    registerNumberDevice,
    getUserByUID
}