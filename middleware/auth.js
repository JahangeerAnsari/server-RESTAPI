const jwt = require('jsonwebtoken');
const { UnauthenticedError } = require('../errors');
const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      msg: 'No token Provided ',
    });
  }
  const token = authHeader.split(' ')[1];
  console.log('token', token);
  try {
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    console.log('decode', decode);
    const {id, username} = decode;
    req.user = {id,username};
    next();
  } catch (error) {
    res.status(401).json({
      msg: 'Not authorized to access this route',
    });
  }
};
module.exports = authenticationMiddleware;
