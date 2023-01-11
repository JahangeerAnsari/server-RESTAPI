const express = require("express");
const router = express.Router();
const {
  authenticationMiddleware,
  authorizationPermissions,
} = require("../middleware/auth");
const {
  addCommentToPostController,
  fetchAllCommentsController,
  getSingleCommentController,
  updateCommentController,
  deleteCommentController,
} = require("../controller/comment.controller");
router.post("/", authenticationMiddleware, addCommentToPostController);
router.get("/", authenticationMiddleware, fetchAllCommentsController);
router.get("/:id", authenticationMiddleware, getSingleCommentController);
router.put("/:id", authenticationMiddleware, updateCommentController);
router.delete("/:id", authenticationMiddleware, deleteCommentController);
module.exports = router;
