const { StatusCodes } = require("http-status-codes");
const Comment = require("../models/comment.model");
const Post = require("../models/post.model");

const addCommentToPostController = async (req, res) => {
  try {
    // get the user
    const user = req.user;
    console.log("user-comment", user);
    // get the post id
    const { postId, description } = req.body;
    const comment = await Comment.create({
      post: postId,
      user: user,
      description,
    });
    console.log("comment121", comment);
    if (!comment) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        msg: "Post comment failed",
      });
    }
    res.status(StatusCodes.CREATED).json({
      msg: `new comment added by ${user.name}`,
      comment,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: error.message,
    });
  }
};
// getall Comments
const fetchAllCommentsController = async (req, res) => {
  try {
    const comments = await Comment.find({});
    console.log("comments", comments);
    if (!comments) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        msg: "Comments not found",
      });
    }
    res.status(StatusCodes.OK).json({
      msg: `Fetched all comments`,
      comments,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: error.message,
    });
  }
};
const getSingleCommentController = async (req, res) => {
  try {
    const { id: commentId } = req.params;
    const comment = await Comment.findById({ _id: commentId });
    // console.log("comments",comments)
    if (!comment) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        msg: `Comment not found for this is ${commentId}`,
      });
    }
    res.status(StatusCodes.OK).json({
      msg: `Comment ...`,
      comment,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: error.message,
    });
  }
};

//  update comment

const updateCommentController = async (req, res) => {
  try {
    const { id: commentId } = req.params;
    const comment = await Comment.findByIdAndUpdate(
      commentId,
      {
        post: req.body?.postId,
        user: req.user,
        description: req?.body?.description,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!comment) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        msg: "Comment not updated..",
      });
    }
    res.status(StatusCodes.OK).json({
      msg: "Comment updated successfully",
      comment,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: error.message,
    });
  }
};
// delete comments
const deleteCommentController = async (req, res) => {
  try {
    const { id: commentId } = req.params;
    const comment = await Comment.findByIdAndDelete(commentId);
    if (!comment) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        msg: "Comment not deleted..",
      });
    }
    res.status(StatusCodes.OK).json({
      msg: "Comment deleted successfully",
      comment,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: error.message,
    });
  }
};
module.exports = {
  addCommentToPostController,
  fetchAllCommentsController,
  getSingleCommentController,
  updateCommentController,
  deleteCommentController,
};
