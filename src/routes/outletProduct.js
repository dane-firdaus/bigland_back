const express = require('express');

const outletProductController = require("../controller/outletProduct.js");
const { route } = require('./auth.js');

const router = express.Router();

//create
router.post('/create', outletProductController.createProduct);

router.get('/product-list', outletProductController.getProductList);

router.post('/create-child', outletProductController.createChildProduct);

router.get('/child-product-list/:id', outletProductController.getListChildProduct);

router.get('/product-details', outletProductController.getProductDetails);

router.post('/edit-product-outlet', outletProductController.editProductOutlet);

router.get('/child-product-details', outletProductController.getChildProductDetails);

router.put('/edit-product-child-outlet', outletProductController.editChildProduct);

router.delete('/delete-product-outlet', outletProductController.deleteProductOutlet);

router.delete('/delete-child-product-outlet', outletProductController.deleteChildProduct);
module.exports = router;