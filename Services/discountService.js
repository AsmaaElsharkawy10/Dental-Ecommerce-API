const { body } = require("express-validator");


module.exports.postDiscount = () => {
  return [
    body("discountAmount").isNumeric().withMessage("discountAmount is required and must be A number"),
    body("date").isObject().withMessage("Discount date must be date formate")
  ];
};

module.exports.putDiscount = () => {
  return [
  body("_id").isNumeric().withMessage("Discount ID must be a number"),
  body("discountAmount").isNumeric().withMessage("discountAmount is required and must be A number"),
  body("date").isObject().withMessage("Discount date must be date formate")
  ];
};

module.exports.deleteDiscount = () => {
  return body("_id").isNumeric().withMessage("id is not a number");
};
