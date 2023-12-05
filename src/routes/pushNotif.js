const express = require('express');

const pushNotifController = require("../controller/pushNotif.js");

const router = express.Router();

//lists
router.get('/call', pushNotifController.callClient);

router.post('/sendmessage', pushNotifController.sendMessage);

router.post('/get-message', pushNotifController.getMessage);

router.post('/create-profile', pushNotifController.createProfileChat);

module.exports = router;