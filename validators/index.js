const { check, validationResult } = require('express-validator');

exports.validateRequest = [
    check('name')
    .notEmpty()
    .withMessage('Name is required')
    .isLength({min:6})
    .withMessage("Minumum 6 character required")
];
exports.validateProductRequest = [
  check('name')
    .notEmpty()
    .withMessage('Product name must be provided')
    .isLength({ min: 6 })
    .withMessage('Minumum 6 character required'),
  check('price')
    .notEmpty()
    .withMessage('Product price must be provided')
    .isLength({ min: 2 })
    .withMessage('Minumum 2 character required'),
  check('company')
    .notEmpty()
    .withMessage('Product brand must be provided')
    .isLength({ min: 4 })
    .withMessage('Minumum 4 character required'),
];
exports.validateUser = [
  check('username')
    .notEmpty()
    .withMessage('User name must be provided')
    .isLength({ min: 4})
    .withMessage('Minumum 4 character required'),
  check('password')
    .notEmpty()
    .withMessage('Password  must be required')
    .isLength({ min: 6 })
    .withMessage('Minumum 6 character required'),
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