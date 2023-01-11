const express = require('express');
const router = express.Router();
const {
  authenticationMiddleware,
  authorizationPermissions,
} = require("../middleware/auth");
const {sentEmailMsgController} =  require("../controller/emailMsg.controller")

 router.post('/sent', authenticationMiddleware, sentEmailMsgController);
// router.post('/verifyOtp', verifyOtp);
module.exports = router;
