const { body, check, param } = require("express-validator");

const Customers = require("../Models/customerSchema");

/*------------------------------------- post --------------------------------------*/

module.exports.validatePostData = () => {
  return [
    body("fullName")
      .isString()
      .withMessage("//name is required and must be alpha"),
      body("image")
      .optional()
      .isString()
      .withMessage("//image is required and must be alpha"),

    body("customerPassword")
      .isAlphanumeric()
      .isLength({ min: 8 })
      .withMessage("//password min length: 8 "),

    body("confirmPassword")
      .isAlphanumeric()
      .isLength({ min: 8 })
      .custom((value, { req }) => {
        if (value === req.body.customerPassword) return true;
        return false;
      })
      .withMessage("//confirmPassword min length: 8"),

    body("customerEmail")
      .isEmail()
      .custom((value) => {
        return Customers.findOne({ customerEmail: value })
          .then((user) => {
            if (user) {
              return Promise.reject("E-mail already in use");
            }
          });
      }).withMessage("//E-mail already in use"),

      body("customerAddress")
      .isString()
      .not()
      .isEmpty()
      .withMessage("//enter customerAddresses as Array not empty"),

    body("role")
      .isString()
      .isIn(['Doctor', 'Merchant'])
      .withMessage("//select your role Merchant or Doctor"),

      body("customerPhone").matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/).custom((value) => {
        return Customers.findOne({ customerPhone: value })
          .then((user) => {
            if (user) {
              return Promise.reject("Phone already in use");
            }
          });
      }).withMessage("please enter valid phone")

    // body("Orders")
    //   .optional()
    //   .isString().withMessage("select your order"),


    // body("customerTotalPurchase")
    //   .optional()
    //   .isInt()
    //   .withMessage("//select your customerTotalPurchase"),

  ];
};


/*------------------------------------- put --------------------------------------*/
module.exports.validatePutData = () => {
  return [
    param("id")
      .custom((value) => {
        return Customers.findOne({ _id: value })
          .then(user => {
            if (!user) return Promise.reject("cannot find this customer");
          });
      }).withMessage("cannot find this customer"),

      body("fullName")
      .isString()
      .withMessage("//name is required and must be alpha"),
      
      body("image")
      .optional()
      .isString()
      .withMessage("//Image is required and must be String"),


      body("customerAddress")
      .isString()
      .not()
      .isEmpty()
      .withMessage("//enter customerAddresses as object not empty"),

      
      

    body("role")
      .isString()
      .isIn(['Doctor', 'Merchant'])
      .withMessage("//select your role Merchant or Doctor"),

      body("customerPhone").optional().isNumeric().withMessage("please enter valid phone"),

      // body("Orders")
      // .optional()
      // .isString().withMessage("select your order"),

    // body("customerTotalPurchase")
    //   .isInt()
    //   .withMessage("//select your customerTotalPurchase"),
  ];
};


/*------------------------------------- delete --------------------------------------*/

module.exports.validateDeleteData = () => {
  return body("_id").isObject().withMessage("id is only number");
};
