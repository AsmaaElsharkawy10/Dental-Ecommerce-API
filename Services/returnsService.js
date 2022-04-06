const { body } = require("express-validator");

module.exports.validatePostData = () => {
  return [
    body("storeId").isNumeric().withMessage("storeId must be number"),
    body("receiptId").isNumeric().withMessage("receiptId must be number "),
    body("returnedProucts").isArray().withMessage("returnedProucts must be an array"),
  ];
};

module.exports.validatePutData = () => {
  return [
    body("_id").isInt().withMessage("id is required and must be number"),
    body("storeId").isNumeric().withMessage("storeId must be number"),
    body("receiptId").isNumeric().withMessage("receiptId must be number "),
    body("returnedProucts").isArray().withMessage("returnedProucts must be an array"),
  ];
};

module.exports.validateDeleteData = () => {
  return  body("_id").isInt().withMessage("id is not a number");
}