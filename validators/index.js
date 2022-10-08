const { check, validationResult } = require('express-validator');

exports.validateRequest = [
    check('name')
    .notEmpty()
    .withMessage('Name is required')
    .isLength({min:6})
    .withMessage("Minumum 6 character required")
];
exports.isRequestValidated = (req, res,next) =>{
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    return res.status(400).json({
      error: errors.array()[0].msg,
      //   message: " valid input"
    });
  }
     next();
}