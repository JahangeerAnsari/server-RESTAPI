const Post = require("../models/post.model");
const User = require("../models/user.model");
const { StatusCodes } = require("http-status-codes");
const Filter = require("bad-words");
const fs = require("fs");
const cloudinaryUploadImage = require("../utils/cloudinary");
const { findById } = require("../models/user.model");
// create new posts
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

    // console.log("req.file post", req.file);
    // get the localpath to image
    const localPath = `public/images/posts/${req.file?.filename}`;
    // upload to cloudinary
    const postImageUploader = await cloudinaryUploadImage(localPath);

    if (!postImageUploader) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        msg: "Failed to upload Post image..",
      });
    }

    // console.log("body data", ...req.body)
    const post = await Post.create({
      ...req.body,

      image: postImageUploader?.url,
      user: userId,
    });
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
// all post fetched by admin
const fetchAllPostsController = async (req, res) => {
  try {
    const posts = await Post.find({}).populate("user");
    if (!posts) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        msg: "post not found",
      });
    }

    res.status(StatusCodes.OK).json({
      msg: "all posts fetched successfully",
      posts,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: error.message,
    });
  }
};
const fetchPostsByUserIdController = async (req, res) => {
  try {
    const loginUserId = req.user.userId;
    const userPosts = await Post.find({ user: loginUserId });
    console.log("userPosts", userPosts);
    if (!userPosts) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        msg: `Post not found for user`,
      });
    }
    res.status(StatusCodes.OK).json({
      msg: "Fetched all posts successfully",
      userPosts,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: error.message,
    });
  }
};
const fetchPostByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id).populate("user").populate("likes").populate("disLikes");
    if (!post) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        msg: `Post not found ${id}`,
      });
    }
    await Post.findByIdAndUpdate(
      id,
      {
        $inc: { numViews: 1 },
      },
      { new: true }
    );
    res.status(StatusCodes.OK).json({
      msg: "Post was successfully fetched..",
      post,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: error.message,
    });
  }
};
// update post
const updatePostController = async (req, res) => {
  try {
    const loginUserId = req.user.userId;
    console.log("loginUserId", loginUserId);
    const { id } = req.params;
    const post = await Post.findByIdAndUpdate(
      { _id: id },
      {
        ...req.body,
        user: loginUserId,
      },
      { new: true }
    );
    console.log("Post", post);
    if (!post) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        msg: `Post not found related to this ${id}`,
      });
    }
    res.status(StatusCodes.OK).json({
      msg: "Post updated successfully",
      post,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: error.message,
    });
  }
};
// delete post
const deletePostController = async (req, res) => {
  try {
    const loginUserId = req.user.userId;
    const { id } = req.params;
    const post = await Post.findByIdAndDelete(
      { _id: id },
      {
        user: loginUserId,
      }
    );
    if (!post) {
      return res.status(StatusCodes).json({
        msg: `No such post found with the id ${id}`,
      });
    };
    res.status(StatusCodes.OK).json({
      msg:'Post deleted successfully',
      post
    })
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: error.message,
    });
  }
};
// Likes posts

const toggleAddLikeToPostController = async (req, res) => {
  try {
    //1. find the post by postiD
    const {postId} = req.body;
  const post  = await Post.findById(postId);
    console.log("post ",post);
    if(!post){
     return  res.status(StatusCodes.BAD_REQUEST).json({
        msg:`Post not found by id ${postId}`
      });
    }

    // 2. find the loginInUser
    const loginInUser = req.user.userId;
    // 3. find the loginInUser like this post
    const isLiked = post.isLiked;
    console.log("isLiked",isLiked) 
    // 4. check if the user has already been disLiked the post
    const isUserDisLikedPost = post?.disLikes?.find(userId => userId?.toString() === loginInUser?.toString());
console.log("isUserDisLikedPost",isUserDisLikedPost)

// if user disLiked the post then remove loginUser from the disLikes array
  if(isUserDisLikedPost){
    const removeDislikeUser =await Post.findByIdAndUpdate(postId,{
      $pull:{
        disLikes:loginInUser
      },
      isDisLiked:false
    },{new:true});
   
    res.status(StatusCodes.OK).json({
      msg:'Remove  disLiked user',
      removeDislikeUser
    })

  }
  if(isLiked){
    const removeLikeUser = await Post.findByIdAndUpdate(postId,{
      $pull:{
        likes:loginInUser
      },
      isLiked:false
    },{new:true});
   
    res.status(StatusCodes.OK).json({
      msg:'Remove Like User ',
      removeLikeUser
    })
  }
  
  else{

    // Add loginUser to the like array
    const post = await Post.findByIdAndUpdate(postId,{
      $push:{likes:loginInUser},
      isLiked:true
    },{new:true}) 
     res.status(StatusCodes.OK).json({
      msg:'You have like this post',
      post
    })
  }

  // toggler
  // remove user if he has already been liked the post
  
    
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: error.message,
    });
  }
}

const toggleDisLikeToPostController = async (req, res) => {
try {
  //1. find the post by postiD
  const {postId} = req.body;
  const post  = await Post.findById(postId);
    console.log("post ",post);
    if(!post){
     return  res.status(StatusCodes.BAD_REQUEST).json({
        msg:`Post not found by id ${postId}`
      });
    }

    // 2. find the loginInUser
    const loginInUser = req.user.userId;
    // 3. find the loginInUser isDisLiked the post;
    const isDisLiked = post.isDisLiked; 
    console.log("isDisLiked",isDisLiked);
    // 4. check if the user has already been disLiked the post
    const isAlreadyLikedPost = post?.likes?.find(userId => userId?.toString() === loginInUser?.toString());
console.log("isAlreadyLikedPost",isAlreadyLikedPost);
// if user is already like the post remove user from likes
if(isAlreadyLikedPost){
 const post = await Post.findOneAndUpdate(postId,{
  $pull:{likes:loginInUser},
  isLiked:false
 },{new:true});
 res.status(StatusCodes.OK).json({
  msg:'Remove user from likes',
  post
 });
}
if(isDisLiked){
  const post = await Post.findOneAndUpdate(postId,{
    $pull:{disLikes:loginInUser},
    isDisLiked:false
  },{new:true});

  res.status(StatusCodes.OK).json({
    msg:'Remove user from disLikes array',
    post
  })
}else{
  const post = await Post.findByIdAndUpdate(postId,{
    $push:{disLikes:loginInUser},
    isDisLiked:true
  },{new:true});
  res.status(StatusCodes.OK).json({
    msg:'Post disliked..',post
  })
}


} catch (error) {
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    msg: error.message,
  });
}
}
module.exports = {
  createPostController,
  fetchAllPostsController,
  fetchPostsByUserIdController,
  fetchPostByIdController,
  updatePostController,
  deletePostController,
  toggleAddLikeToPostController,
  toggleDisLikeToPostController
};
