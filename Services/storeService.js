const { body } = require("express-validator");

module.exports.validatePostData = () => {
  return [
    body("storeName").isString().withMessage("storeName must be alpha"),
    body("storePhone").isNumeric().withMessage("storePhone must be number "),
    body("storeAddress").isObject().withMessage("storeAddress must be an object"),
    body("storeRent").isNumeric().withMessage("storeRent must be number"),
    body("storeEmployeesId").isArray().withMessage("please enter array of employee"),
    body("storeCategoriesId").isArray().withMessage("please enter array of category"),
  ];
};


module.exports.validatePutData = () => {
  return [
    body("_id").isInt().withMessage("id is required and must be number"),
    body("storeName").isString().withMessage("storeName must be alpha"),
    body("storePhone").isNumeric().withMessage("storePhone must be number "),
    body("storeAddress").isObject().withMessage("storeAddress must be an object"),
    body("storeRent").isNumeric().withMessage("storeRent must be number"),
    body("storeEmployeesId").isArray().withMessage("please enter array of employee"),
    body("storeCategoriesId").isArray().withMessage("please enter array of category"),
  ];
};

module.exports.validateDeleteData = () => {
  return  body("_id").isInt().withMessage("id is not a number");
}




