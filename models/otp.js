const mongoose = require("mongoose");
const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique:false
  },
  code:{
    type:String,
    required:true
  },
  expireIn:{
    type:Number
  }
},{
    timestamps:true
});
module.exports = mongoose.model('Otp', otpSchema, 'Otp');