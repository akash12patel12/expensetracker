const express = require('express');
const mailController = require('../controllers/mailController');
const userAuth = require('../middlewares/auth')
const SibApiV3Sdk = require('sib-api-v3-sdk');
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const router = express.Router();

// router.post('/forgotpassword',  mailController.forgotPassword );




module.exports = router;