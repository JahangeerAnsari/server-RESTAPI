const CustomAPIError = require('./custom-error');
const { StatusCodes } = require('http-status-codes');
class UnauthenticedError extends CustomAPIError {
  constructor(message) {
    super(message);
    // 401 auaUTHENTICATION
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}
module.exports = UnauthenticedError;
