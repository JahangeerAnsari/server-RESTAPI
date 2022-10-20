const express = require("express");
const router = express.Router();
const {login,register} = require("../controller/auth.controller");
const {
  validateUser,
  isRequestValidated,
  loginValidation,
} = require('../validators');
router.post('/register', validateUser, isRequestValidated, register);
router.post('/login', loginValidation, isRequestValidated, login);
module.exports = router