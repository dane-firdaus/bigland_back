const express = require('express');

const userController = require("../controller/auth.js");

const router = express.Router();

//register
router.post('/register', userController.registerUser);

router.post('/register-device', userController.registerKamarDevice);
router.post('/register-number', userController.registerNumberDevice);
router.post('/register-device-token', userController.deviceToken);
//sign In
router.post('/signin', userController.signInUser);

router.post('/signin-outlet', userController.signInUserOutlet);
//get User Info
router.get('/get-user', userController.getUser);

router.get('/get-user-byuid', userController.getUserByUID);

router.get('/refresh-token', userController.refreshToken);

router.get('/list-kamar', userController.signInListKamar);

router.get('/filter-list-kamar', userController.filterUserKamar);

// router.put('/update-password', UserController.updatePassword);

module.exports = router;