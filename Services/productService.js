const { body } = require("express-validator");


module.exports.postProduct = () => {
  return [
    body("productName").isString().withMessage("productName is required and must be String"),
    body("price").isNumeric().withMessage("price must be  number"),
    body("image").optional().isString().withMessage("Image must be string"),
    body("description").isString().withMessage("Description must be string"),
    body("quantity").isInt().withMessage("quantity must be  number"),
    body("countryOfManufacture").isString().withMessage("countryOfManufacture must be String"),
    body("expirationDate").isDate().withMessage("expirationDate date must be date formate"),
    body("company").isString().withMessage("company name date must be string"),
    body("discount").isString().withMessage("Discount ID must be  String"),
    body("rating").optional().isString().withMessage("rating ID must be  number"),
    body("category").isString().withMessage("category ID must be  string")

  ]
};

module.exports.putProduct = () => {
  return [
    body("_id").isNumeric().withMessage("product ID must be a number"),
    body("productName").isString().withMessage("productName is required and must be String"),
    body("price").isNumeric().withMessage("price must be  number"),
    body("image").optional().isString().withMessage("Image must be string"),
    body("description").isString().withMessage("Description must be string"),
    body("quantity").isInt().withMessage("quantity must be  number"),
    body("countryOfManufacture").isString().withMessage("countryOfManufacture must be String"),
    body("expirationDate").isDate().withMessage("expirationDate date must be date formate"),
    body("company").isString().withMessage("company name date must be string"),
    body("discount").isString().withMessage("Discount ID must be  String"),
    body("rating").optional().isString().withMessage("rating ID must be  number"),
    body("category").isString().withMessage("category ID must be  string")
  ]
};

module.exports.deleteProduct = () => {
  return body("_id").isObject().withMessage("id is not a number");
};