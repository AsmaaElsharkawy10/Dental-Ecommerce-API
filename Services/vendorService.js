const { body } = require("express-validator");
const Vendor = require("../Models/vendorSchema")
module.exports.postVendor = () => {
    return [
      body("vendorName").isString().withMessage("vendorName is required and must be A string"),
      body("companyName").isString().withMessage("please enter company name"),
      body("phoneNumber").isString().custom((value) => {
        return Vendor.findOne({ phoneNumber: value }).then((vendor) => {
          if (vendor) {
            return Promise.reject("Phone number already in use");
          }
        });
      }).withMessage("please enter valid number"),
      body("country").isString().withMessage("please enter vendor country of the company"),
      body("receiptId").isNumeric().withMessage("receipt id is a number"),
    ];
  };


  module.exports.putVendor = () => {
    return [
      body("_id").isNumeric().withMessage("id is not a number"),
      body("vendorName").isString().withMessage("vendorName is required and must be A string"),
      body("phoneNumber").custom((value) => {
        return Vendor.findOne({ phoneNumber: value }).then((vendor) => {
          if (vendor) {
            return Promise.reject("Phone number already in use");
          }
        });
      }),
      body("companyName").isString().withMessage("please enter company name"),
      body("country").isString().withMessage("please enter vendor country of the company"),
      body("receiptId").isNumeric().withMessage("receipt id is a number"),
    ];
  };

  module.exports.deleteVendor= () => {
    return body("_id").isNumeric().withMessage("id is not a number");
  };
