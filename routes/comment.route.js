const express = require('express');
const router = express.Router();
const {
  authenticationMiddleware,
  authorizationPermissions,
} = require("../middleware/auth");
const {
  addCommentToPostController
} = require('../controller/comment.controller');
router.post("/",authenticationMiddleware,addCommentToPostController);
module.exports = router;