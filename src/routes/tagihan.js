const express = require('express');

const tagihanController = require("../controller/tagihan.js");

const router = express.Router();

//lists
router.get('/tagihan-details', tagihanController.getTagihanDetails);

module.exports = router;