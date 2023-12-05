const express = require('express');

const orderController = require("../controller/order.js");

const router = express.Router();

//create
router.post('/create', orderController.createOrder);

router.get('/order-kamar', orderController.kamarGetOrder);

router.get('/order-outlet', orderController.outletGetOrder);

router.get('/order-outlet-details', orderController.getDetailsOrderOutlet);

router.post('/order-details-proccess', orderController.OrderStatusProccess);

router.post('/order-details-delivery', orderController.OrderStatusDelivery);

router.post('/order-details-received', orderController.OrderStatusReceived);

router.post('/order-details-canceled', orderController.OrderStatusCanceled);

router.delete('/delete-data', orderController.OrderDelete);

module.exports = router;