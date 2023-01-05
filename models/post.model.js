const  mongoose  = require("mongoose");

const postSchema = new mongoose.Schema({
  title:{
    type:String,
    // required:[true,'Post title is required!'],
    trim:true
  },
  // Created by only category
  category:{
    type:String,
    required:[true,'Post Category is required!'],
    default:"All"
  },
  isLiked:{
    type:Boolean,
    default:false
  },
  isDisLiked:{
    type:Boolean,
    default:false
  },
  numViews:{
    type:Number,
    default:0
  },
  likes:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  }],
  disLikes:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  }],
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:[true,'Please Author is required!'],
  },
  description:{
    type:String,
    // required:[true,'Post description is required !']
  },
  image:{
    type:String,
    default:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80"
  }
},{
  toJSON:{
    virtuals:true
  },
  toObject:{
    virtuals:true
  },
  timestamps:true
});

const Post  = mongoose.model("Post",postSchema);
module.exports = Post;