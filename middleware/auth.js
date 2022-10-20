const jwt = require('jsonwebtoken');
const { UnauthenticedError } = require('../errors');
const { StatusCodes } = require('http-status-codes');
const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    // 401 --UNAUTHORIZED
    return res.status(StatusCodes.UNAUTHORIZED).json({
      msg: 'No token Provided ',
    });
  }
  const token = authHeader.split(' ')[1];
  console.log('token', token);
  try {
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    console.log('decode', decode);
    const {userId, name} = decode;
    req.user = {userId, name };        
    next();
  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      msg: 'Not authorized to access this route',
    });
  }
};
module.exports = authenticationMiddleware;
