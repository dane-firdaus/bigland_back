const orderModel = require("../models/order.js");
const bycript = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createOrder = async (req, res, next) => {
  const { body } = req;
  if (
    !body.order_number ||
    !body.kamar ||
    !body.status ||
    !body.outlet_id ||
    !body.kamar_id ||
    !body.items ||
    !body.total ||
    !body.date
  ) {
    res.status(400).json({
      message: "isi data dengan benar !",
    });}
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
        const data = {
            order_number : body.order_number,
            kamar: body.kamar,
            status: body.status,
            outlet_id: body.outlet_id,
            kamar_id: body.kamar_id,
            total: body.total,
            date: body.date
        }
       const orderIds = await orderModel.createOrder(data);
       
       for(let counter = 0; counter <= body.items.length - 1; counter++){
        const item = body.items === null ? null : body.items[counter];
        const product_name = item.product_name !== undefined ? item.product_name : null;
        const product_id = item.product_id !== undefined ? item.product_id : 0;
        const jumlah_order = item.jumlah_order !== undefined ? item.jumlah_order : 0;
        const harga = item.harga !== undefined ? item.harga : 0;
        const note = item.note !== undefined ? item.note : null;
        const detailsItems = {
            order_id : orderIds.valueData !== undefined ? orderIds.valueData : null,
            product_name: product_name !== undefined ? product_name : null,
            product_id: product_id !== undefined ? product_id : null,
            jumlah_order : jumlah_order !== undefined ? jumlah_order : 0,
            harga: harga !== undefined ? harga : 0,
            note : note !== undefined ? note : null,
            kamar_id: body.kamar_id !== undefined ? body.kamar_id : null
        }
        await orderModel.createChildOrder(detailsItems);
       }
        res.status(200).json({
            message: "create order successfully !",
            desc: decodedId
        })
    } catch (error) {
        res.status(500).json({
            message: "internal server error !",
            data: error.stack
        })   
    }
};


const kamarGetOrder = async(req, res, next) => {
    const id = req.query.kamar;
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
      const [list] =   await orderModel.kamarGetOrder(id);
        res.status(200).json({
            orders : list,
            desc: decodedId

        })
    } catch (error) {
        res.status(500).json({
            message: "internal server error !",
            data : error.stack
        })
    }
}

const outletGetOrder = async(req, res, next) => {
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
            const [list] = await orderModel.outletGetOrder(id);
            res.status(200).json({
                orders : list,
                desc: decodedId
            })
        } catch (error) {
            res.status(500).json({
                message: "internal server error !",
                data: error.stack
            })
        }
}

const getDetailsOrderOutlet = async(req, res, next) => {
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
        const [order] = await orderModel.getAnOrder(id);
        const [child] = await orderModel.getChildFromAnOrder(id);
        res.status(200).json({
           order : order.map(item => {
            const {kamar, order_id, order_number, date, status, total} = item;
            return {
                kamar: kamar,
                order_id : order_id,
                order_number: order_number,
                date: date,
                status: status,
                total: total
           }}),
           child_order : child.map(item => {
            const {id, product_id, product_name, jumlah_order, harga, note, kamar_id} = item;
            return {
                id: id,
                product_id: product_id,
                product_name: product_name,
                jumlah_order: jumlah_order,
                harga: harga,
                note: note,
                kamar_id : kamar_id
            }
           }),
           desc: decodedId
        })
    } catch (error) {
        res.status(500).json({
            message: "internal server error !",
            data: error.stack
        });
    }
}

const OrderStatusProccess = async(req, res, next) => {
    const id = req.query.order;
    const {body} = req;
    if(!body.status){
        res.status(400).json({
            message: "masukan data status !"
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
            await orderModel.updateStatusOrderProccess(id);
            res.status(200).json({
                message: "update status successfully !",
                desc: decodedId,
                status: body.status
            })
        } catch (error) {
            res.status(500).json({
                message: "internal server error !",
                data: error.stack
            })
        }
}

const OrderStatusDelivery = async(req, res, next) => {
    const id = req.query.order;
    const {body} = req;
    if(!body.status){
        res.status(400).json({
            message: "masukan data status !"
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
            await orderModel.updateStatusOrderDelivery(id);
            res.status(200).json({
                message: "update status successfully !",
                desc: decodedId,
                status: body.status
            })
        } catch (error) {
            res.status(500).json({
                message: "internal server error !",
                data: error.stack
            })
        }   
}
const OrderStatusReceived = async(req, res, next) => {
    const id = req.query.order;
    const {body} = req;
    if(!body.status){
        res.status(400).json({
            message: "masukan data status !"
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
            await orderModel.updateStatusOrderReceived(id);
            res.status(200).json({
                message: "update status successfully !",
                desc: decodedId,
                status: body.status
            })
        } catch (error) {
            res.status(500).json({
                message: "internal server error !",
                data: error.stack
            })
        }   
}

const OrderStatusCanceled = async(req, res, next) => {
    const id = req.query.order;
    const {body} = req;
    if(!body.status){
        res.status(400).json({
            message: "masukan data status !"
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
            await orderModel.updateStatusOrderCanceled(id);
            res.status(200).json({
                message: "update status successfully !",
                desc: decodedId,
                status: body.status
            })
        } catch (error) {
            res.status(500).json({
                message: "internal server error !",
                data: error.stack
            })
        }   
}

const OrderDelete = async(req, res, next) => {
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
            await orderModel.deleteOrder(id);
            await orderModel.deleteChildOrder(id);
            res.status(200).json({
                message: "order deleted successfully!",
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
    createOrder,
    kamarGetOrder,
    outletGetOrder,
    getDetailsOrderOutlet,
    OrderStatusProccess,
    OrderStatusDelivery,
    OrderStatusReceived,
    OrderStatusCanceled,
    OrderDelete,
}
