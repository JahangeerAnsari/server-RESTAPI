const Post = require("../models/post.model");
const User = require("../models/user.model");
const { StatusCodes } = require("http-status-codes");
const Filter = require("bad-words");
const fs = require("fs");
const cloudinaryUploadImage = require("../utils/cloudinary");
const createPostController = async (req, res) => {
  try {
    const { userId } = req.user;

    const filter = new Filter();
    const isProfane = filter.isProfane(req.body.title, req.body.description);
    // block the user from creating post
    if (isProfane) {
      await User.findByIdAndUpdate(userId, {
        isBlocked: true,
      });
      return res.status(StatusCodes.BAD_REQUEST).json({
        msg:
          "Creating Post failed because it contains profane words and you have been blocked",
      });
    }

    console.log("req.file post",req.file)
    // get the localpath to image
    const localPath = `public/images/posts/${req.file.filename}`;
    // upload to cloudinary
    const postImageUploader = await cloudinaryUploadImage(localPath);
    
   if(!postImageUploader){
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg:'Failed to upload Post image..'
    })
   }
  

    const post = await Post.create({
      ...req.body,
    image: postImageUploader?.url,
  user:userId});
    if (!post) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        msg: "Failed to create post new Post, try again",
      });
    }
    res.status(StatusCodes.CREATED).json({
      msg: "New Post created successfully",
      post,
    });
    // remove image from server once it up
    fs.unlinkSync(localPath);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: error.message,
    });
  }
};
module.exports = {
  createPostController,
};
