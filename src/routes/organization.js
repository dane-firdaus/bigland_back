const express = require('express');

const orgController = require("../controller/organization.js");

const router = express.Router();

//register
router.post('/register', orgController.registerOrg);

//sign In
router.post('/signin', orgController.signInOrg);

//get User Info
// router.get('/get-user', userController.getUser);

// router.get('/refresh-token', userController.refreshToken);

router.post('/update-status', orgController.updateStatusOrg);

module.exports = router;