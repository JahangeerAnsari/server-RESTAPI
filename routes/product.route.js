const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductsByQueary,
  createProduct,
  getProduct,
  deleteProduct,
  updateProduct,
} = require('../controller/product.controller');
const {validateProductRequest,isRequestValidated}  = require('../validators/index')

router.route('/').get(getAllProducts).post(validateProductRequest,
  isRequestValidated,createProduct)
router.route('/search').get(getProductsByQueary);
router.route('/:id').get(getProduct).delete(deleteProduct).patch(updateProduct);

module.exports = router;

