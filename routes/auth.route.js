const express = require('express');
const router = express.Router();
const {
  login,
  register,
  logout,
  getAllUsers,
  getSingleUser,
} = require('../controller/auth.controller');
const {
  authenticationMiddleware,
  authorizationPermissions,
} = require('../middleware/auth');
const checkPermissions = require('../utils/checkPermission');
const {
  validateUser,
  isRequestValidated,
  loginValidation,
} = require('../validators');
router.post('/register', validateUser, isRequestValidated, register);
// this route is exxample of many authorization permissions
// router.get('/',authenticationMiddleware,authorizationPermissions('admin','user'), getAllUsers);
router.get(
  '/',
  authenticationMiddleware,
  authorizationPermissions('admin', 'user'),
  getAllUsers
);
// get the single user
router.get('/:id', authenticationMiddleware, checkPermissions, getSingleUser);
router.post('/login', loginValidation, isRequestValidated, login);
router.get('/logout', logout);
module.exports = router;
