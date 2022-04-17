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
  .post(validatePostCategory(), createCategory)
 status.put("/Category/:_id",validatePutCategory(),updateCategory)
 status.delete("/Category/:_id",validateDeleteCategory(),deleteCategory)
 status.get("/Category/:_id",getCategoryById)


module.exports = status;