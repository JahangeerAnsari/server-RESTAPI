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
      const token = user.createJWT()
      // 201 created statusCodes
      res.status(StatusCodes.CREATED).json({
        msg: 'New user created..',
        data: user,
        token
      });
    }
  } catch (error) {
    // console.log(res);
    console.log('hello===========>', error, error.message);

    // res.send(error);
     res.status(500).json({ msg: error.message });
   
  }
};

const login = async (req, res) => {
  res.send('login.......');
};

module.exports = {
  login,
  register,
};
