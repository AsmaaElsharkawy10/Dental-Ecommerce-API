const express = require("express");
const { body, query, param } = require("express-validator");
const {
  getAllFlyboy,
  getFlyboyById,
  createFlyboy,
  updateFlyboy,
  deleteFlyboy,
} = require("../Controllers/FlyboyController");
const {
  validatePostFlyboy,
  validatePutFlyboy,
  validateDeleteFlyboy,
} = require("../Services/FlyboyServices");
const status = express.Router();
status
  .route("/Flyboy")
  .get(getAllFlyboy)
  .get(getFlyboyById)
  .post(validatePostFlyboy(), createFlyboy)
  .put(validatePutFlyboy(), updateFlyboy)
  .delete(validateDeleteFlyboy(), deleteFlyboy);


module.exports = status;
