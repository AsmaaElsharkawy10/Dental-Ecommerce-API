const router = require("express").Router();
const {
  getAllOrOne,
  addCustomer,
  updateCustomer,
  deleteCustomer,
} = require("../Controllers/customerController");
const {
  validatePostData,
  validatePutData,
  validateDeleteData,
} = require("../Services/customerValidator");

router
  .route("/customer/:id?")
  .get(getAllOrOne)
  .post(validatePostData(), addCustomer)
  .put(validatePutData(), updateCustomer)
  .delete(validateDeleteData(), deleteCustomer);

module.exports = router;