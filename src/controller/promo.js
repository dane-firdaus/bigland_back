const promoModels = require("../models/promo.js");
const path = require('path');
const bycript = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const createPromo = async(req, res, next) => {
    const {body} = req;
    if(!body.title || !body.description || !body.body || !body.out_id){
        res.status(400).json({
            message: "masukan data dengan benar !"
        });
    }
    const imagePath = req.file.path;
    if(!imagePath){
        res.status(400).json({
            message: "masukan photo !"
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
        const dataInput = {
            title: body.title,
            description: body.description,
            image_uri:imagePath,
            body: body.body,
            out_id:body.out_id
        }
        try {
            await promoModels.createPromo(dataInput);
            res.status(200).json({
                message: "promo created successfully !",
                desc: decodedId
            })
        } catch (error) {
            res.status(500).json({
                message: "internal server error !",
                data: error.stack
            });
            console.log(error.stack);
            
        }


}


const getPromoById = async(req, res, next) => {
    const id = req.query.outlet;
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
        const [lists] = await promoModels.getPromoByOutletId(id);

        res.status(200).json({
            promo:lists,
            desc: decodedId
        })
    } catch (error) {
        res.status(500).json({
            message: "internal server error !",
            data: error.stack
        });
        
    }
}

const getDetailsPromo = async(req, res, next) => {
    const id = req.query.promo;
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
            const [details] = await promoModels.getDetailsPromo(id);
            res.status(200).json({
                details: details[0],
                desc: decodedId
            })
        } catch (error) {
            res.status(500).json({
                message: "internal server error !",
                data: error.stack
            });
            console.log(error.data);
        }
}
const getListPromo = async(req, res, next) => {
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
            const [listPromo] = await promoModels.getListPromo();
            res.status(200).json({
                promo_kamu: listPromo,
                desc: decodedId
            })
        } catch (error) {
            res.status(500).json({
                message: "internal server error !",
                data: error.stack
            })
            console.log(error.stack);
        }
}

const deletePromo = async(req, res, next) => {
    const id = req.query.promo;
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
        await promoModels.deletePromo(id);
        res.status(200).json({
            message: "berhasil delete promo !",
            data : decodedId
        })
    } catch (error) {
        res.status(500).json({
            message: "internal server error !",
            data: error.stack
        })
        console.log(error.stack);
    }
}

module.exports = {
    createPromo,
    getPromoById,
    getDetailsPromo,
    getListPromo,
    deletePromo
}