const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      ],
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    profilePhoto: {
      type: String,
      default:
        "https://pixabay.com/illustrations/tiktok-avatar-icon-placeholder-1968236/",
    },
    bio: {
      type: String,
    },
    postCount: {
      type: Number,
      default: 0,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    isFollowing: {
      type: Boolean,
      default: false,
    },
    isUnFollowing: {
      type: Boolean,
      default: false,
    },

    isAccountVerified: {
      type: Boolean,
      default: false,
    },
    accountVerificationToken: String,
    accountVerificationTokenExpires: Date,
    viewedBy: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },
    followers: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },
    following: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },
    passwordChangeAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  }
);


// vertual method to populate created post 
userSchema.virtual("posts",{
  ref:"Post",
  foreignField:'user',
  localField:"_id"
})

// saved password as bycry password format

// userSchema.pre("save", async function (next) {
//   const salt = await bcrypt.genSalt(10);
//   this.password = bcrypt.hash(this.password, salt);
//   next();
// });
userSchema.pre("save", async function (next) {
  console.log("===> presave middleware...");
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
// userSchema.pre("save", async function (next) {
//   const data = this.getUpdate();
//   const salt = await bcrypt.genSalt(10);
//   data.password = await bcrypt.hash(data.password, salt);
//   next();
// });

// created token
userSchema.methods.createAccountVarificationToken = async function(){
 const verificationToken =crypto.randomBytes(32).toString("hex");
  this.accountVerificationToken = crypto.createHash('sha256')
  .update(verificationToken)
  .digest('hex');
  // now for token exprire
  this.accountVerificationTokenExpires = Date.now() +30*60*1000;  //10 minutes
  return verificationToken;
}

// Password reset/forgot
userSchema.methods.createPasswordResetToken = async function(){
  const resetToken = crypto.randomBytes(32).toString('hex') ;
  this.passwordResetToken = crypto.createHash('sha256')
  .update(resetToken)
  .digest('hex');
  this.passwordResetExpires = Date.now() +30*60*1000;  //10 minutes
  return resetToken;
} 



// jwt creation
userSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name, role: this.role },
    process.env.SECRET_KEY,
    { expiresIn: `${process.env.LIFE_TIME}` }
  );
};

// Comparing password

userSchema.methods.comparePassword = async function (CandidatePassword) {
  const isMatch = await bcrypt.compare(CandidatePassword, this.password);
  return isMatch;
};
module.exports = mongoose.model("User", userSchema);
