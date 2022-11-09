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
  check('name')
    .notEmpty()
    .withMessage('User name field not be empty')
    .isLength({ min: 4 })
    .withMessage(' Name Minumum 4 character required'),
  check('email')
    .notEmpty()
    .withMessage('Email  not be Empty field')
    .isEmail()
    .withMessage('Valid email is required'),

  check('password')
    .notEmpty()
    .withMessage('Password  not be Empty field')
    .isLength({ min: 6 })
    .withMessage('Password must be minimum 6 character required'),
];

exports.loginValidation = [
  check('email')
    .notEmpty()
    .withMessage('Email  not be Empty field')
    .isEmail()
    .withMessage('Valid email is required'),

  check('password')
    .notEmpty()
    .withMessage('Password  not be Empty field')
    .isLength({ min: 6 })
    .withMessage('Password must be minimum 6 character required'),
];
exports.EmailValidation = [
  check('email')
    .notEmpty()
    .withMessage('Email  not be Empty field')
    .isEmail()
    .withMessage('Valid email is required'),
];

exports.jobsValidation = [
  check('company')
    .notEmpty()
    .withMessage('Company name not be Empty field')
    .isLength({ min: 2 })
    .withMessage('Company name must be minimum 2 character required'),

  check('positon')
    .notEmpty()
    .withMessage('Positon  not be Empty field')
    .isLength({ min: 2 })
    .withMessage('Positon must be minimum 2 character required'),
  // check('createdBy').notEmpty().withMessage('Please fill the name of the user'),
];
exports.EmailValidation = [
  check('email')
    .notEmpty()
    .withMessage('Email  not be Empty field')
    .isEmail()
    .withMessage('Valid email is required'),
]; 

exports.productValidation = [
  check('name')
    .notEmpty()
    .withMessage('Product name not be Empty field')
    .isLength({ min: 2 })
    .withMessage('Product name must be minimum 2 character required'),

  check('price').notEmpty().withMessage('Price  not be Empty field'),
  // check('productPictures[0].img')
  //   .notEmpty()
  //   .withMessage('Product image not be Empty field'),

  // check('createdBy').notEmpty().withMessage('Please fill the name of the user'),
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