const historyModels = require("../models/history.js");
const path = require('path');
const bycript = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const listHistory = async(req, res, next) => {
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
            const [lists] = await historyModels.listHistory(id);
            res.status(200).json({
                history_list:lists,
                desc: decodedId
            })
        } catch (error) {
            res.status(500).json({
                message: "internal server error !",
                data: error.stack
            })
            
        }

}

const getDetailsHistory = async(req, res, next) => {
    const id = req.query.order;
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
            const [order] = await historyModels.getOrderDetails(id);
            const [child_order] = await historyModels.getChildByOrder(id);
            res.status(200).json({
                order: order,
                order_child : child_order,
                desc: decodedId
            })
        } catch (error) {
            res.status(500).json({
                message: "internal server error !",
                data: error.stack
            })
        }
}

module.exports = {
    listHistory,
    getDetailsHistory
}