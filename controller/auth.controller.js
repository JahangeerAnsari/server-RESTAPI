const User = require('../models/user.model');
const { StatusCodes } = require('http-status-codes');
const checkPermissions = require('../utils/checkPermission');

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
        msg: 'New user created..',
        user,
        token,
      });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// const get all users having role is user
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: 'user' }).select('-password');
    if (!users) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        msg: 'No such users found',
      });
    }

    return res.status(StatusCodes.OK).json({
      msg: 'Fetched all users',
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
    const user = await User.findOne({ _id: req.params.id }).select('-password');
    if (!user) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        msg: 'no such user present !..',
      });
    }
    // checkPermissions(req.user,user._id);
    return res.status(StatusCodes.OK).json({
      msg: 'Fetched user..',
      user,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: error.message,
    });
  }
};

// user login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        msg: 'Invalid Credentials',
      });
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        msg: 'Invalid Credentials',
      });
    }
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({
      msg: 'Login successfull...',
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
  res.send('logout.........');
  // try {

  // } catch (error) {
  //   res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
  //     msg: error.message,
  //   });
  // }
};

module.exports = {
  login,
  register,
  getAllUsers,
  logout,
  getSingleUser,
};
