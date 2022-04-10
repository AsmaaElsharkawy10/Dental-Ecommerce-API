const { body } = require("express-validator");


module.exports.postReceipt = () => {
  return [
    body("purchaserName").isString().withMessage("purchaserName is required and must be alpha"),
    body("orderId").isNumeric().withMessage("enter order ID "),
    body("date").isDate().withMessage("Receipt date must be date formate"),
    body("status").custom((value) => {
      if (["paid", "owed"].includes(value)) {
        return true;
      }
      throw new Error("status must be paid or owed");
    }),
    body("totalPrice").isNumeric().withMessage("please enter total price of receipt"),
    body("type").custom((value) => {
      if (["selling", "buying"].includes(value)) {
        return true;
      }
      throw new Error("type must be selling or buying");
    }),
    body("products").isArray().withMessage("please enter array of products"),
  ];
};

module.exports.putReceipt = () => {
  return [
  body("_id").isNumeric().withMessage("Receipt ID must be a number"),
  body("purchaserName").isString().withMessage("purchaserName is required and must be alpha"),
    body("orderId").isNumeric().withMessage("enter order ID "),
    body("date").isDate().withMessage("Receipt date must be date formate"),
    body("status").custom((value) => {
      if (["paid", "owed"].includes(value)) {
        return true;
      }
      throw new Error("status must be paid or owed");
    }),
    body("totalPrice").isNumeric().withMessage("please enter total price of receipt"),
    body("type").custom((value) => {
      if (["selling", "buying"].includes(value)) {
        return true;
      }
      throw new Error("type must be selling or buying");
    }),
    body("products").isArray().withMessage("please enter array of products"),
  ];
};

module.exports.deleteReceipt = () => {
  return body("_id").isNumeric().withMessage("id is not a number");
};
