const errorHandlerMiddleware = (err, req, res, next) => {
  console.log('dfghjkl');
  return res.status(500).json({
    msg: 'Something went wrong,plese try again',
  });
};
module.exports = errorHandlerMiddleware;
