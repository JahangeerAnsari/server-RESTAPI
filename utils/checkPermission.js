const { StatusCodes } = require('http-status-codes');
const User = require('../models/user.model');

const checkPermissions = async (req, res, next) => {
  try {
    let user = await User.findOne({ _id: req.params.id }).select('-password');
    if (!user) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        msg: 'no such user present !..',
      });
    }
    user = JSON.parse(JSON.stringify(user));
    if (req.user.userId === user._id || req.user.role === 'admin') {
      return next();
    }
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: 'Access denied!',
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: error.message,
    });
  }
};
module.exports = checkPermissions;
