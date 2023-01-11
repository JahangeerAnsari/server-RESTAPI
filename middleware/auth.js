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
    console.log('decode44444444444444', decode);


    const {userId, name,role} = decode;
    console.log("udddddddddd",userId,name,role)
    req.user = {userId, name ,role};        
    next();
  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      msg: 'Not authorized to access this route',
    });
  }
};
// const authorizationPermissions = (req, res, next) => {
//   if (req.user.role !== 'admin') {
//     return res.status(StatusCodes.UNAUTHORIZED).json({
//       msg: 'You are not valid user to authorized this route',
//     });
//   }
//   next();
// };

const authorizationPermissions = (...roles) =>{
 return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        msg: 'You are not valid user to authorized this route',
      });
    }
     next();
  };
 
}
module.exports = { authenticationMiddleware, authorizationPermissions };
