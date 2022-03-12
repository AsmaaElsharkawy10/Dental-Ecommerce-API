const { body } = require("express-validator");

module.exports.validatePostData = () => {
  return [
    body("storeId").isString().withMessage("storeName must be alpha"),
    body("storePhone").isNumeric().withMessage("storePhone must be number "),
    body("storeAddress").isObject().withMessage("storeAddress must be an object"),
    body("storeRent").isNumeric().withMessage("storeRent must be number"),
    body("storeEmployeesId").isArray().withMessage("please enter id of employee"),
    body("storeCategoriesId").isArray().withMessage("please enter id of category"),
  ];
};




