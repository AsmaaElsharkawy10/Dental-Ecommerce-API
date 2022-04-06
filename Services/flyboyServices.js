const { body } = require("express-validator");
const Flyboy = require("../Models/flyboySchema");

module.exports.validatePostFlyboy = () => {
  return [
    body("username").isString().withMessage("user name should be string "),
    body("password").isInt().isLength({ min: 8 }).withMessage("password min length: 8 "),
    body("confirmPassword").isInt().isLength({ min: 8 })
      .custom((value, { req }) => {
        if (value === req.body.password) return true;
        return false;
      }).withMessage("password not confirm "),
    body("email").isEmail()
    .custom((value) => {
        return Flyboy.findOne({ email: value }).then((user) => {
          if (user) {
            return Promise.reject("E-mail already in use");
          }
        });
      }).withMessage("please enter valid email"),

  ];
};

module.exports.validatePutFlyboy = () => {
    return [
        body("_id").isInt().withMessage("id is required and must be number"),
        body("newFlyboy.password").isInt().isLength({ min: 8 }).withMessage("password min length: 8 "),
        body("newFlyboy.email").isEmail()
        .custom((value) => {
            return Flyboy.findOne({ email: value }).then((user) => {
              if (user) {
                return Promise.reject("E-mail already in use");
              }
            });
          }).withMessage("please enter valid email"),
      ];
    };

module.exports.validateDeleteFlyboy = () => {
  return body("_id").isInt().withMessage("id is not a number");
};