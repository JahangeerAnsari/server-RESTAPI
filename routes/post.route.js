const express = require("express");
const router = express.Router();
const {createPostController} = require("../controller/post.controller");
const {
  uploadPhoto,
  postImageResize,
} = require("../middleware/uploads/uploadPhoto");
const {
  authenticationMiddleware,
  authorizationPermissions,
} = require("../middleware/auth");
router.post("/add-new-post",authenticationMiddleware,uploadPhoto.single("image"),postImageResize, createPostController);
module.exports = router;