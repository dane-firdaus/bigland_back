const outletProductModel = require("../models/outletProduct.js");
const path = require('path');
const bycript = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const createProduct = async(req, res, next) => {
    const {body} = req;
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
    if(!body.name || !body.description || !body.out_id) {
        res.status(400).json({
            message: "isi data dengan benar !"
        });
    }
    const imagePath = req.file.path;
    if(!imagePath){
        res.status(400).json({
            message: "masukan photo !"
        })
    }
    const mappingBody = {
        name: body.name,
        description: body.description,
        tag: body.tag ? body.tag : null,
        image_uri: imagePath,
        out_id: body.out_id
    }
    try {
        await outletProductModel.createProduct(mappingBody);
        res.status(200).json({
            message: "berhasil tambahkan product !"
        })
    } catch (error) {
        res.status(500).json({
            message: "internal server error !",
            data: error.stack
        })
        
    }
    
}

const getProductList = async(req, res, next) => {
    const outId = req.query.out_id;
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
            const [list] = await outletProductModel.getProductList(outId);
            res.status(200).json({
                products : list,
                message: "load data successfuly !",
                desc: decodedId
            })
        } catch (error) {
            res.status(500).json({
                message: "internal server error !",
                data: error.stack
            })
        }

}

const createChildProduct = async(req, res, next) => {
    const {body} = req;
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
    if(!body.name || !body.description || !body.product_id || !body.price) {
        res.status(400).json({
            message: "isi data dengan benar !"
        });
    }
    const imagePath = req.file.path;
    if(!imagePath){
        res.status(400).json({
            message: "masukan photo !"
        })
    }
    const mappingBody = {
        name: body.name,
        description: body.description,
        tag: body.tag ? body.tag : null,
        price: body.price,
        image_uri: imagePath,
        product_id: body.product_id
    }
    try {
        await outletProductModel.createChildProduct(mappingBody);
        res.status(200).json({
            message: "berhasil upload detail product !"
        });
    } catch (error) {
        res.status(500).json({
            message: "internal server error !",
            data: error.stack
        })
    }
}


const getListChildProduct = async(req, res, next) => {
    const id = req.params.id;
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
        const [lists] = await outletProductModel.childProductList(id);
        res.status(200).json({
            child_products: lists,
            ids: id,
            desc: decodedId
        })
    } catch (error) {
        res.status(500).json({
            message: "internal server error !",
            data: error.stack
        })
    }
}

const getProductDetails = async(req, res, next) => {
    const id = req.query.product;
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
           const [details] =  await outletProductModel.getProductDetails(id);
           res.status(200).json({
            product_details: details[0],
            desc: decodedId
           })
        } catch (error) {
            res.status(500).json({
                message: "internal server error !",
                data: error.stack
            });
            console.log(error.stack)
        }
}

const editProductOutlet = async(req, res, next) => {
    const id = req.query.product;
    const {body} = req;
    if(!body.name || !body.description){
        res.status(400).json({
            message: "mohon isi Data product dengan benar !"
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
    const imagePath = req.file.path;
    if(!imagePath){
        res.status(400).json({
            message: "masukan photo !"
        })
    }
    const removeImage = (filePath) => {
        filePath = path.join(__dirname, '../..', filePath);
        console.log(filePath);
        fs.unlink(filePath, err => console.log(err));
    }
    const dataInput = {
        name: body.name,
        description: body.description,
        tag: body.tag === '' ? null : body.tag,
        image_uri: imagePath
    }
    try {
       const [details] =  await outletProductModel.getProductDetails(id);
        removeImage(details[0].image_uri);
       await outletProductModel.editProduct(dataInput, id);
       res.status(200).json({
        message: "product edited successfully !",
        desc: decodedId
       })

    } catch (error) {
        res.status(500).json({
            message: "internal server error !",
            data: error.stack
        })
    }
}

const getChildProductDetails = async(req, res, next) => {
    const id = req.query.product;
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
        const [child_product] = await outletProductModel.getChildProductDetails(id);
        res.status(200).json({
            details: child_product,
            desc: decodedId
        })
    } catch (error) {
        res.status(500).json({
            message: "internal server error !",
            data: error.stack
        })
    }
}

const editChildProduct = async(req, res, next) => {
    const id = req.query.product;
    const {body} = req;
    if(!body.name || !body.description || !body.price){
        res.status(400).json({
            message: "masukan data ngan benar !"
        })
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
        const removeImage = (filePath) => {
            filePath = path.join(__dirname, '../..', filePath);
            console.log(filePath);
            fs.unlink(filePath, err => console.log(err));
        }
        const dataInput = {
            name: body.name,
            description: body.description,
            price: body.price,
            tag: body.tag === '' ? null : body.tag,
            image_uri: imagePath
        }
        try {
            console.log(dataInput);
            const [details] = await outletProductModel.getChildProductDetails(id);
            await removeImage(details[0].image_uri);
            await outletProductModel.editChildProduct(dataInput, id);
            res.status(200).json({
                message: "your child product update successfully !",
                desc: decodedId
            }) 
        } catch (error) {
            res.status(500).json({
                message: "internal server error !",
                data: error.stack,
            });
            console.log(error.stack)
            
        }

        
    }
    const deleteProductOutlet = async(req, res, next) => {
        const id = req.query.product;
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
            await outletProductModel.deleteProduct(id);
            await outletProductModel.deleteChildProductWithProductId(id);
            res.status(200).json({
                message: "product has been deleted successfully !",
                desc: decodedId
            })
        } catch (error) {
            res.status(500).json({
                message: "internal server error !",
                data: error.stack
            })
        }
    }

const deleteChildProduct = async(req, res, next) => {
    const id = req.query.product;
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
            await outletProductModel.deleteChildProduct(id);
            res.status(200).json({
                message: "delete child product successfully !",
                desc: decodedId
            })
        } catch (error) {
            res.status(500).json({
                message: "internal server error !",
                data: error.stack
            });
            console.log(error.stack)
        }
}

const createProductHouseKeeping = async(req, res, next) => {
    const {body} = req
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
        if(!body.name || !body.description || !body.price || !body.out_id){
            res.status(400).json({
                message: "isi data dengan benar !"
            });
        }
        try {
            const dataInput = {
                name : body.name,
                description : body.description,
                price : body.price,
                tag: null,
                image_uri: null,
                out_id: body.out_id,
            }
            await outletProductModel.createChildProduct(dataInput);
            res.status(200).json({
                message: "berhasil menambahkan product !",
                desc: decodedId
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
    createProduct,
    getProductList,
    createChildProduct,
    getListChildProduct,
    getProductDetails,
    editProductOutlet,
    getChildProductDetails,
    editChildProduct,
    deleteProductOutlet,
    deleteChildProduct,
    createProductHouseKeeping
}