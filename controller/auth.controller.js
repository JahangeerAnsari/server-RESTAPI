const User = require('../models/user.model');
const { StatusCodes } = require('http-status-codes');

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
        data: user,
        token,
      });
    }
  } catch (error) {
  
    res.status(500).json({ msg: error.message });
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
      },
      token,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: error.message,
    });
  }
};

module.exports = {
  login,
  register,
};
