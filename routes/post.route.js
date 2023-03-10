const express = require("express");
const router = express.Router();
const {
  createPostController,
  fetchAllPostsController,
  fetchPostsByUserIdController,
  fetchPostByIdController,
  updatePostController,
  deletePostController,
  toggleAddLikeToPostController,
  toggleDisLikeToPostController
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
router.put("/likes",authenticationMiddleware,toggleAddLikeToPostController);
router.put("/dislikes",authenticationMiddleware,toggleDisLikeToPostController);
module.exports = router;
