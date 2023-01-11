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

router.post("/", authenticationMiddleware, addNewCategoryController);
router.get("/", authenticationMiddleware, getAllCategoryController);
router.get("/:id", authenticationMiddleware, getSingleCategoryController);
router.put("/:id", authenticationMiddleware, updateCategoryController);
router.delete("/:id", authenticationMiddleware, deleteCategoryController);

module.exports = router;
