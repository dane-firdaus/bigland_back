const checkoutModels = require("../models/checkout.js");
const path = require('path');
const bycript = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');


const handleCheckOut = async(req, res, next) => {
    const id = req.query.uid;
    try {
        await checkoutModels.deleteOrder(id);
        await checkoutModels.deleteChildOrder(id);
       const [list] = await checkoutModels.getChatProfile(id);
       for(let counter = 0; counter <= list.length - 1; counter++){
           await checkoutModels.deleteChildChat(list[counter].id);
           console.log(list[counter]);
       }
        res.status(200).json({
            chat_profile: list[0],
            message: "berhasil !"
        })
    } catch (error) {
        res.status(500).json({
            message: "internal server error !",
            data: error.stack
        });
        console.log(error.stack)
    }
}

module.exports = {
    handleCheckOut
}