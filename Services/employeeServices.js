const { body } = require("express-validator");
const Employees = require("../Models/employeeSchema");

module.exports.validatePostEmployee = () => {
  return [
    // body("_id").isInt().withMessage("id is required and must be number"),
    body("fullName").isString().withMessage("name is required and must be alpha"),
    body("password").isInt().isLength({ min: 8 }).withMessage("password min length: 8 "),
    body("confirmPassword").isInt().isLength({ min: 8 })
      .custom((value, { req }) => {
        if (value === req.body.password) return true;
        return false;
      }).withMessage("password min length: 8 "),
    body("email").isEmail()
    .custom((value) => {
        return Employees.findOne({ email: value }).then((user) => {
          if (user) {
            return Promise.reject("E-mail already in use");
          }
        });
      }).withMessage("please enter valid email"),
    body("address").isObject().optional().withMessage("send address as an object"),
    body("image").optional().isString().withMessage("send your image"),
    body("phone").isInt().withMessage("send your phone"),
    body("workHour").isInt().withMessage("send your workHour"),
    body("gender").isString().withMessage("send your gender male or female"),
    body("militarystatus").isString().withMessage("send your militarystatus"),
    body("dateOfEmployment").isString().withMessage("send your dateOfEmployment"),
    body("position").isString().withMessage("send your position"),

  ];
};

module.exports.validatePutEmployee = () => {
    return [
        body("_id").isInt().withMessage("id is required and must be number"),
        body("newEmployee.fullName").isString().withMessage("name is required and must be alpha"),
        body("newEmployee.password").isInt().isLength({ min: 8 }).withMessage("password min length: 8 "),
        body("newEmployeeImage").optional().isString().withMessage("send your image"),
        body("newEmployee.email").isEmail()
        .custom((value) => {
            return Employees.findOne({ email: value }).then((user) => {
              if (user) {
                return Promise.reject("E-mail already in use");
              }
            });
          }).withMessage("please enter valid email"),
        body("newEmployee.address").isObject().withMessage("send address as an object"),
        body("newEmployee.image").isString().withMessage("send your image"),
        body("newEmployee.phone").isInt().withMessage("send your phone"),
        body("newEmployee.workHour").isInt().withMessage("send your workHour"),
        body("newEmployee.gender").isInt().withMessage("send your gender male or female"),
        body("newEmployee.militarystatus").isString().withMessage("send your militarystatus"),
        body("newEmployee.dateOfEmployment").isString().withMessage("send your dateOfEmployment"),
        body("newEmployee.position").isString().withMessage("send your position"),
    
      ];
    };

module.exports.validateDeleteEmployee = () => {
  return body("_id").isInt().withMessage("id is not a number");
};