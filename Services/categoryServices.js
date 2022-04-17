const { body } = require("express-validator");
module.exports.validatePostCategory = () => {
  return [
    // body("_id").isInt().withMessage("id is required and must be number"),
    body("name").isString().withMessage("name is required and must be alpha"),
    body("image").isString().withMessage("send your image"),
  ];
};

module.exports.validatePutCategory = () => {
    return [
        // body("_id").isInt().withMessage("id is required and must be number"),
        body("newCategory.name").isString().withMessage("name is required and must be alpha"),
        body("newCategory.image").optional().isString().withMessage("send your image"),
      ];
    };

module.exports.validateDeleteCategory = () => {
  return body("_id").isInt().withMessage("id is not a number");
};