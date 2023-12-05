const authModel = require("../models/auth.js");
const pushNotifModel = require("../models/pushNotif.js");
const  pusher  = require('../config/pusher.js');
const twilio = require("twilio");


const sendMessage = async(req, res, next) => {
    const {body} = req;

    if(!body.pesan || !body.profile_id){
        res.status(400).json({
            message: "internal server error !"
        })
    }

    try {
        const dataStore = {
            pesan : body.pesan,
            profile_id: body.profile_id,
            from_uid: body.from_uid
        }
        await pushNotifModel.saveMessage(dataStore);
        res.status(200).json({
            message: body.pesan,
            data: dataStore
        })
    } catch (error) {
        res.status(500).json({
            message: "internal server error!",
            data:error.stack
        })
    }
}


const getMessage = async(req, res, next) => {
const uid = req.query.uid;
const {body} = req;
if(!body.to_uid){
    res.status(400).json({
        message: "masukan data dengan benar !",
    })
}
try {
    const mapLookUpValue = {
        uid:uid,
        to_uid:body.to_uid,
    }
    const [profileDetails] = await pushNotifModel.getProfileId(mapLookUpValue);
    const [messages] = await pushNotifModel.getMessageFrom(profileDetails[0].id);
    res.status(200).json({
        profile:profileDetails,
        messages: messages
    })
} catch (error) {
    res.status(500).json({
        message:"internal server error !",
        data: error.stack,
    });
    console.log(error.stack);
}

}


const createProfileChat = async(req, res, next) => {
    const {body} = req;
    if(!body.profile_name || !body.uid || !body.to_uid){
        res.status(400).json({
            message: "masukan data dengan benar !"
        })
    }
    try {
        await pushNotifModel.createProfileChat(body);
        res.status(200).json({
            message: "berhasil membuat profile chat baru !"
        })
    } catch (error) {
        res.status(500).json({
            message: "internal server  error !"
        })
    }
}


const callClient = async(req, res, next) => {

    const accountSid = "AC88806fade3c66a3df4442a0967a3b73e";
    const authToken = "8467fefa5e5c321719f16263ece7b3e5";
    const phoneNumber = "+628119666764";

    
    try {
        
        res.send({
            SUCCESS: 'TEST'
        });
    } catch (error) {
        res.status(500).json({
            message: "internal server error !",
            data: error.stack
        });
        console.log(error.stack);
    }
}

module.exports = {
    callClient,
    sendMessage,
    getMessage,
    createProfileChat,
}