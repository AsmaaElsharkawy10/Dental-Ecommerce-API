const { body } = require("express-validator");

module.exports.validatePostData = () => {
  return [
    body("storeName").isString().withMessage("storeName must be alpha"),
    body("storePhone").isNumeric().withMessage("storePhone must be number "),
    body("storeAddress").isObject().withMessage("storeAddress must be an object"),
    body("storeRent").isNumeric().withMessage("storeRent must be number"),
    body("storeEmployees").isArray().withMessage("please enter array of employess"),
    body("storeCategories").isArray().withMessage("please enter array of categories"),
  ];
};




