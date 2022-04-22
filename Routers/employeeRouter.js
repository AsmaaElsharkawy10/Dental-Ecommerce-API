const express = require("express");
const employeeRouter = express.Router();

const {
  getAllEmployees,
  getEmployeesById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../Controllers/employeeController");
const {
  validatePostEmployee,
  validatePutEmployee,
  validateDeleteEmployee,
} = require("../Services/employeeServices");
employeeRouter
  .route("/employee")
  .get(getAllEmployees)
  .get(getEmployeesById)
  .post(validatePostEmployee(), createEmployee)
  .put(validatePutEmployee(), updateEmployee)
  .delete(validateDeleteEmployee(), deleteEmployee);


module.exports = employeeRouter;
