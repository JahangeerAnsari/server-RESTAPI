const jwt = require('jsonwebtoken');
const { BadRequestError} = require('../errors');
const login = (req, res) => {
  try {
    const { username, password } = req.body;
    // bad request statusCode =400
    // if(!username || !password){
    //     throw new BadRequestError("Please provide email and password")
    // }

    const id = new Date().getDate();
    const token = jwt.sign({ id, username }, process.env.SECRET_KEY, {
      expiresIn: '30d',
    });
    res.status(200).json({
      msg: 'User created...',
      token,
    });
  } catch (error) {
    console.log('error--ssssss', error);
  }
};

const dashBoard = async (req, res) => {
  console.log('user', req.user);
  try {
    const luckyNumber = Math.floor(Math.random() * 100);

    res.status(200).json({
      msg: `hello ${req.user.username} and your lucky number is ${luckyNumber}`,
    });
  } catch (error) {
    console.log('error', error);
  }
};
module.exports = {
  login,
  dashBoard,
};
