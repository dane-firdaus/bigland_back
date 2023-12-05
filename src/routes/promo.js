const express = require('express');

const promoController = require("../controller/promo.js");

const router = express.Router();

//lists
router.get('/promo-outlet', promoController.getPromoById);

router.post('/create-promo', promoController.createPromo);

router.get('/promo-details', promoController.getDetailsPromo);

router.get('/list-promo-all', promoController.getListPromo);

router.delete('/promo-delete', promoController.deletePromo);

module.exports = router;