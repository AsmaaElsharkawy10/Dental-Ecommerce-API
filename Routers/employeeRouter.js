const express = require("express");
const { body, query, param } = require("express-validator");
const {
  getAllEmployees,
  getEmployeesById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../Controllers/controllerEmployee");
const {
  validatePostEmployee,
  validatePutEmployee,
  validateDeleteEmployee,
} = require("../Services/servicesEmployee");
const status = express.Router();
status
  .route("/employee")
  .get(getAllEmployees)
  .get(getEmployeesById)
  .post(validatePostEmployee(), createEmployee)
  .put(validatePutEmployee(), updateEmployee)
  .delete(validateDeleteEmployee(), deleteEmployee);


module.exports = status;
