const express = require('express');
const router = express.Router();
const { login, dashBoard } = require('../controller/jsonwebtoken.controller');
const { validateUser, isRequestValidated } = require('../validators');
const authMiddleWare = require("../middleware/auth")

router.route('/dashboard').get(authMiddleWare,dashBoard);
router.route('/login').post(validateUser, isRequestValidated, login);
module.exports = router;
