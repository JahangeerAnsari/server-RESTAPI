const {CustomAPIError} = require("../errors");
const { StatusCodes } = require('http-status-codes');
const errorHandlerMiddleware = (err, req, res, next) => {
   if(err instanceof CustomAPIError){
  console.log("error msg$$$$",err)
    return res.status(err.StatusCodes).json({
      msg:err.msg
    })
   }
  //  intern error code 500
   return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Something went wrong try again ..")
};
module.exports = errorHandlerMiddleware;
