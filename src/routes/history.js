const express = require('express');

const historyController = require("../controller/history.js");

const router = express.Router();

//lists
router.get('/history-order', historyController.listHistory);

router.get('/history-details', historyController.getDetailsHistory);

module.exports = router;