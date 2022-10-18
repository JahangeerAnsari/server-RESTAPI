const CustomAPIError = require('../errors/custom-error');
// const errorHandlerMiddleware = (err, req, res, next) => {
//   console.log('===. HANLING ERROR: ', err);
//   if (err instanceof CustomAPIError) {
//     return res.status(err.statusCode).json({ msg: err.message });
//   }
//   return res.status(500).send('Something went wrong try again later');
// };
function errorHandlerMiddleware(error, req, res, next) {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  // return next(error);
  return res.status(500).send('Something went wrong try again later');
}

module.exports = errorHandlerMiddleware;
