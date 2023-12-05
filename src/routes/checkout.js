const express = require('express');

const checkOutController = require("../controller/checkout.js");

const router = express.Router();

//lists
router.delete('/checkout', checkOutController.handleCheckOut);

// router.get('/history-details', historyController.getDetailsHistory);

module.exports = router;