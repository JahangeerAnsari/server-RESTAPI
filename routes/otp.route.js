const express = require('express');
const router = express.Router();
const {
  EmailValidation,
  isRequestValidated,
  
} = require('../validators');
const {sendEmail,verifyOtp} =  require("../controller/otp.controller")

router.post('/send', EmailValidation, isRequestValidated, sendEmail);
router.post('/verifyOtp', verifyOtp);
module.exports = router;
