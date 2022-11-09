const express = require('express');
const router = express.Router();
const {
  getAllProduct,
  createProduct
} = require('../controller/product.controller');
const { productValidation, isRequestValidated } = require('../validators');
const multer = require('multer');
const shortid = require('shortid');
const path = require('path')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname),'uploads'));
  },
  filename: function (req, file, cb) {
  
    cb(null, shortid.generate() + '-' + file.originalname);
  },
});

const upload = multer({storage });

router.route('/').post(upload.array('productPictures'), productValidation, isRequestValidated , createProduct);

module.exports = router;