const { body } = require("express-validator");

module.exports.validatePostData = () => {
  return [
    body("storeName").isString().withMessage("storeName must be alpha"),
    body("storePhone").isString().withMessage("storePhone must be isString "),
    body("storeAddress").isString().withMessage("storeAddress must be an string"),
    body("storeRent").isString().withMessage("storeRent must be string"),
    body("storeEmployeesId").isInt().withMessage("please enter num of employee"),
    body("storeCategoriesId").isInt().withMessage("please enter num of category"),
  ];
};


module.exports.validatePutData = () => {
  return [
    body("storeName").isString().withMessage("storeName must be alpha"),
    body("storePhone").isString().withMessage("storePhone must be is String "),
    body("storeAddress").isString().withMessage("storeAddress must be an String"),
    body("storeRent").isString().withMessage("storeRent must be string"),
    body("storeEmployeesId").isInt().withMessage("please enter num of employee"),
    body("storeCategoriesId").isInt().withMessage("please enter num of category"),
  ];
};

module.exports.validateDeleteData = () => {
  return  body("_id").isInt().withMessage("id is not a number");
}




