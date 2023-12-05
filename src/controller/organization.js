const orgModel = require("../models/organization.js");
const bycript = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerOrg = async (req, res, next) => {
    const body = req.body;
    if(!body.name || !body.user_id || !body.password || !body.org_id || !body.status ) {
        res.status(400).json({
            message: "mohon isi data dengan benar !"
        });
    }
    const hashedPassword =   bycript.hashSync( body.password, 10 );
    
    try {
        await orgModel.registerOrg(body, hashedPassword)
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

const signInOrg = async ( req, res, next) => {
    const {body} = req;
    try {
       const [getUser] = await orgModel.signIn(body);
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

const updateStatusOrg = async(req, res, next) => {
    const {body} = req;
    if(!body.status || !body.user_id) {
        res.status(400).json({
            message: "masukan status dan user_id dengan benar !"
        });
    }
    try {
        await orgModel.updateStatusOrg(body);
        res.status(200).json({
            message : "berhasil update status !"
        })
    } catch (error) {
        res.status(500).json({
            message: "internal server error !",
            data : error.stack
        })
        
    }
}




module.exports = {
    registerOrg,
    signInOrg,
    updateStatusOrg
}


