const { body } = require("express-validator");

module.exports.validatePostData = () => {
  return [
    body("storeName").isString().withMessage("storeName must be alpha"),
    body("storePhone").isNumeric().withMessage("storePhone must be number "),
    body("storeAddress").isObject().withMessage("storeAddress must be an object"),
    body("storeRent").isNumeric().withMessage("storeRent must be number"),
    body("storeEmployeesId").isNumeric().withMessage("please enter id of category"),
    body("storeCategoriesId").isNumeric().withMessage("please enter id of category"),
  ];
};




