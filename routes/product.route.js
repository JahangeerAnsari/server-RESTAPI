const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductsByQueary,
  createProduct,
  getProduct,
  deleteProduct,
  updateProduct,
  filterProductByValue,
  selectProductByValue,
  limitsNumberOfProducts,filterOnNumericValue
} = require('../controller/product.controller');
const {validateProductRequest,isRequestValidated}  = require('../validators/index')

router.route('/').get(getAllProducts).post(validateProductRequest,
  isRequestValidated,createProduct)
router.route('/search').get(getProductsByQueary);
router.route('/filtered').get(filterProductByValue);
router.route('/select').get(selectProductByValue);
router.route('/limit').get(limitsNumberOfProducts);
router.route('/numericFilter').get(filterOnNumericValue);
router.route('/:id').get(getProduct).delete(deleteProduct).patch(updateProduct);

module.exports = router;

