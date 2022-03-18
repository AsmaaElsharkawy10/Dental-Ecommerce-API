const { body } = require("express-validator");

module.exports.validatePostData = () => {
  return [
    body("storeId").isNumeric().withMessage("storeId must be number"),
    body("receiptId").isNumeric().withMessage("receiptId must be number "),
    body("spoiledProducts").isArray().withMessage("spoiledProducts must be an array"),
  ];
};