const express = require("express");
const returnsRouter = express.Router();

const {
  validatePostData,
  validatePutData,
  validateDeleteData,
} = require("../Services/returnsService");

const controller = require("./../Controllers/returnsController");

returnsRouter
  .route("/returnedProducts/:id?")
  .get(controller.getAllReturnsOrOne)
  .post(validatePostData(), controller.addReturnedProduct)
  .put(validatePutData, controller.updateReturnedProduct)
  .delete(validateDeleteData, controller.deleteReturnedProduct);

module.exports = returnsRouter;
