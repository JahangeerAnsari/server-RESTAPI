const User = require("../models/user.model");
const { StatusCodes } = require("http-status-codes");
const checkPermissions = require("../utils/checkPermission");
const nodeMailer = require("nodemailer");

const register = async (req, res) => {
  try {
    // const { name, email, password } = req.body;
    const emailExits = await User.findOne({ email: req.body.email });

    if (emailExits) {
      // 400
      return res.status(StatusCodes.BAD_REQUEST).json({
        msg: `This user already Present try another..`,
      });
    } else {
      const user = await User.create(req.body);
      const token = user.createJWT();
      // 201 created statusCodes
      res.status(StatusCodes.CREATED).json({
        msg: "New user created..",
        user,
        token,
      });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const verifyToken = async (req, res) => {};

// const get all users having role is user
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: req.user.role }).select("-password");
    if (!users) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        msg: "No such users found",
      });
    }

    return res.status(StatusCodes.OK).json({
      msg: "Fetched all users",
      users,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: error.message,
    });
  }
};
const fetchedonlyUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "user" }).select("-password");
    if (!users) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        msg: "No such users found",
      });
    }

    return res.status(StatusCodes.OK).json({
      msg: "Fetched all users",
      users,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: error.message,
    });
  }
};

const getSingleUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id }).select("-password");
    if (!user) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        msg: "no such user present !..",
      });
    }
    // checkPermissions(req.user,user._id);
    return res.status(StatusCodes.OK).json({
      msg: "Fetched user..",
      user,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id: userId } = req.params;
    const isUserExist = await User.findOneAndDelete({ _id: userId });
    if (!isUserExist) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        msg: `no such user present for this id ${userId}`,
      });
    }
    res.status(StatusCodes.OK).json({
      msg: "the user has been deleted for ",
      userId,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: error.message,
    });
  }
};
const UpdateUser = async (req, res) => {
  try {
    const { id: userId } = req.params;
    let _user = await User.findById({ _id: userId });
    console.log("userrrrrrrrrr", _user);
    if (!_user) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        msg: `no such user present for this id ${userId}`,
      });
    }

    user = {
      ...JSON.parse(JSON.stringify(_user)),
      ...req.body,
    };
    await _user.save();
    res.status(StatusCodes.OK).json({
      msg: "User details updated successfully",
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: error.message,
    });
  }
};

// following users

const followingController = async (req, res) => {
  //1 find the user want to follow and update the followers fields
  // 2 update the login user  following fields
  try {
    const { followId } = req.body;
    const loginUserId = req.user.userId;
    console.log("loginUserId", loginUserId);

    // prevent duplicate following

    const followUser = await User.findById(followId);

    const alreadyFollowing = followUser?.followers?.find(
      (user) => user?.toString() === loginUserId.toString()
    );

    if (alreadyFollowing) {
      return res.status(StatusCodes.OK).json({
        msg: "you have already been following this user",
      });
    }

    //1 we have to find the users we want to follow and updated his followers field
    // jisko follow kana hia uska id req.body me dalna with login account se
    await User.findByIdAndUpdate(
      followId,
      {
        $push: { followers: loginUserId },
        isFollowing: true,
      },
      { new: true }
    );
    // ab mere me show hoga kisko following ksr raha hu
    await User.findByIdAndUpdate(
      loginUserId,
      {
        $push: {
          following: followId,
        },
      },
      { new: true }
    );

    res.status(StatusCodes.OK).json({
      msg: "you have started following this users",
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: error.message,
    });
  }
};

//UnFollow

const unfollowController = async (req, res) => {
  try {
    const { unFollowId } = req.body;
    const loginUserId = req.user.userId;
    // lets unfollow the usere
    await User.findByIdAndUpdate(
      unFollowId,
      {
        $pull: { followers: loginUserId },
        isFollowing: false,
      },
      { new: true }
    );

    await User.findByIdAndUpdate(
      loginUserId,
      {
        $pull: {
          following: unFollowId,
        },
      },
      { new: true }
    );
    res.status(StatusCodes.OK).json({
      msg: "you have unfollow this user",
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: error.message,
    });
  }
};

// BLOCK USER
const blockUserController = async (req, res) => {
  try {
    const { id: userId } = req.params;
    const user = await User.findByIdAndUpdate(
      userId,
      {
        isBlocked: true,
      },
      { new: true }
    );

    if (!user) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: `there is no such account present with this id ${userId}`,
      });
    }

    res.status(StatusCodes.OK).json({
      msg: "You have blocked this user",
      user,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: error.message,
    });
  }
};
const unBlockUserController = async (req, res) => {
  try {
    const { id: userId } = req.params;
    const user = await User.findByIdAndUpdate(
      userId,
      {
        isBlocked: false,
      },
      { new: true }
    );

    if (!user) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: `there is no such account present with this id ${userId}`,
      });
    }

    res.status(StatusCodes.OK).json({
      msg: "Unblocked User ...",
      user,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: error.message,
    });
  }
};

// sending mails

const generateVerificationTokenController = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      mailTransform(req.body.email);
      res.status(StatusCodes.CREATED).json({
        msg: "mail sended...",
      });
    }
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: error.message,
    });
  }
};

const mailTransform = (email) => {
  console.log("Calling");

  let transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: "devtesting769@gmail.com",
      pass: `${process.env.PASSWORD}`,
    },
  });
  let details = {
    from: "devtesting769@gmail.com",
    to: email,
    subject: "Testing our nodemailer",
    text: `mail send to the user`,
  };
  console.log("detailse", details);
  transporter.sendMail(details, (err) => {
    if (err) {
      console.log("it has error", err);
    } else {
      console.log("email has been send");
    }
  });
};

// user login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        msg: "Invalid Credentials",
      });
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        msg: "Invalid Credentials",
      });
    }
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({
      msg: "Login successfull...",
      user: {
        name: user.name,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: error.message,
    });
  }
};

const logout = async (req, res) => {
  res.send("logout.........");
  // try {

  // } catch (error) {
  //   res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
  //     msg: error.message,
  //   });
  // }
};
const fetchedAllUsers = (req, res) => {
  res.send("this is routeer");
};

module.exports = {
  login,
  register,
  getAllUsers,
  logout,
  getSingleUser,
  verifyToken,
  fetchedAllUsers,
  deleteUser,
  UpdateUser,
  fetchedonlyUsers,
  followingController,
  unfollowController,
  blockUserController,
  unBlockUserController,
  generateVerificationTokenController
};
