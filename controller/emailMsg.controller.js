const EmailMsg = require("../models/emailMessage.model");

const sentEmailMsgController = async (req,res) =>{
try {
  res.send("hellll000000 sent msg..")
} catch (error) {
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    msg: error.message,
  });
}
}
module.exports = {
  sentEmailMsgController
}