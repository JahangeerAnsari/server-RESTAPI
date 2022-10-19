const express = require("express");
const router = express.Router();
const {login,register} = require("../controller/auth.controller");
const { validateUser, isRequestValidated } = require("../validators");
router.post('/register', validateUser, isRequestValidated, register);
router.post('/login',login);
module.exports = router