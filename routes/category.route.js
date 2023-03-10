const express = require("express");
const router = express.Router();
const {
  authenticationMiddleware,
  authorizationPermissions,
} = require("../middleware/auth");
const {
  addNewCategoryController,
  getAllCategoryController,
  getSingleCategoryController,
  updateCategoryController,
  deleteCategoryController
} = require("../controller/category.controller");
const { isRequestValidated, categoryValidation } = require("../validators");

router.post("/add", authenticationMiddleware,categoryValidation, isRequestValidated, addNewCategoryController);
router.get("/", authenticationMiddleware, getAllCategoryController);
router.get("/single/:id", authenticationMiddleware, getSingleCategoryController);
router.put("/update/:id", authenticationMiddleware,categoryValidation, isRequestValidated, updateCategoryController);
router.delete("/delete/:id", authenticationMiddleware, deleteCategoryController);

module.exports = router;
