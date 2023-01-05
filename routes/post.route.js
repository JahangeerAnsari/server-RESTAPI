const express = require("express");
const router = express.Router();
const {
  createPostController,
  fetchAllPostsController,
  fetchPostsByUserIdController,
  fetchPostByIdController,
  updatePostController,
  deletePostController
} = require("../controller/post.controller");
const {
  uploadPhoto,
  postImageResize,
} = require("../middleware/uploads/uploadPhoto");
const {
  authenticationMiddleware,
  authorizationPermissions,
} = require("../middleware/auth");
router.post(
  "/add-new-post",
  authenticationMiddleware,
  uploadPhoto.single("image"),
  postImageResize,
  createPostController
);
router.get(
  "/all-post",
  authenticationMiddleware,
  authorizationPermissions("admin"),
  fetchAllPostsController
);
router.get(
  "/my-posts",
  authenticationMiddleware,
  authorizationPermissions("user"),
  fetchPostsByUserIdController
);
router.get("/:id",authenticationMiddleware,fetchPostByIdController)
router.put("/update/:id",authenticationMiddleware,updatePostController);
router.delete("/delete/:id",authenticationMiddleware,deletePostController);
module.exports = router;
