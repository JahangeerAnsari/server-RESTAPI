const { StatusCodes } = require("http-status-codes");
const Comment = require("../models/comment.model");
const Post = require("../models/post.model");

const addCommentToPostController = async (req, res) => {
  try {
    // get the user
     const user = req.user;
    console.log("user-comment", user);
    // get the post id
    const { postId,description } = req.body;
    const comment = await Comment.create({
      post: postId,
      user: user,
      description
    });
    console.log("comment121", comment);
    if(!comment){
      return res.status(StatusCodes.BAD_REQUEST).json({
        msg:'Post comment failed'
      })
    }
    res.status(StatusCodes.CREATED).json({
      msg:`new comment added by ${user.name}`,
      comment
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: error.message,
    });
  }
};
module.exports = {
  addCommentToPostController,
};
