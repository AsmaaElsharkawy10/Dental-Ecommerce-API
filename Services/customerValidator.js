const { body } = require("express-validator");

module.exports.validatePostData = () => {
  return [
    body("fullName")
      .isString()
      .withMessage("name is required and must be alpha"),
    body("customerPassword")
      .isAlphanumeric()
      .isLength({ min: 8 })
      .withMessage("password min length: 8 "),
    body("customerEmail").isEmail().withMessage("please enter valid email"),
    body("customerAddresses")
      .isArray()
      .isInt()
      .withMessage("send address as an array"),
    body("role").isString().withMessage("select your role"),
    body("Orders").isArray().isInt().withMessage("select your order"),
    body("customerTotalPurchase")
      .isInt()
      .withMessage("select your customerTotalPurchase"),
    body("customerImage").isString().withMessage("please enter valid image"),
    body("customerPhone").isInt().withMessage("please enter valid phone"),
  ];
};

module.exports.validatePutData = () => {
  return [
    body("fullName")
      .isString()
      .withMessage("name is required and must be alpha"),
    body("customerPassword")
      .isAlphanumeric()
      .isLength({ min: 8 })
      .withMessage("password min length: 8 "),
    body("customerEmail").isEmail().withMessage("please enter valid email"),
    body("customerAddresses")
      .isArray()
      .isInt()
      .withMessage("send address as an array"),
    body("role").isString().withMessage("select your role"),
    body("Orders").isArray().isInt().withMessage("select your order"),
    body("customerTotalPurchase")
      .isInt()
      .withMessage("select your customerTotalPurchase"),
    body("customerImage").isString().withMessage("please enter valid image"),
    body("customerPhone").isInt().withMessage("please enter valid phone"),
  ];
};

module.exports.validateDeleteData = () => {
  return body("_id").isInt().withMessage("id is only number");
};
