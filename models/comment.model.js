const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema(
  {
    post:{
      type: mongoose.Schema.Types.ObjectId,
      ref:'Post',
      
    },
    user:{
      type:Object,
      required:[true,'User is required']
    },
    description:{
      type:String,
      // required:[true,'Comment description is required']
    }
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("comment", commentSchema);
