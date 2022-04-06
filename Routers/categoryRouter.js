const express = require("express");
const { body, query, param } = require("express-validator");
const {
  getAllCategorys,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../Controllers/categoryController");
const {
    validatePostCategory,
  validatePutCategory,
  validateDeleteCategory,
} = require("../Services/categoryServices");
const status = express.Router();
status
  .route("/Category")
  .get(getAllCategorys)
  .get(getCategoryById)
  .post(validatePostCategory(), createCategory)
  .put(validatePutCategory(), updateCategory)
  .delete(validateDeleteCategory(), deleteCategory);

module.exports = status;
