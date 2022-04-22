const express = require("express");
const employeeRouter = express.Router();

const {
  getAllOrOne,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../Controllers/employeeController");
const {
  validatePostData,
  validatePutData,
  validateDeleteData,
} = require("../Services/employeeServices");
employeeRouter
  .route("/employee")
  .get(getAllOrOne)
 // .get(getEmployeesById)
  .post(validatePostData(),addEmployee)
  .put(validatePutData(), updateEmployee)
  .delete(validateDeleteData(), deleteEmployee);


module.exports = employeeRouter;
