const express = require("express");
const spoiledRouter = express.Router();

const {
  validatePostData,
  validatePutData,
  validateDeleteData,
} = require("../Services/spoiledService");
const controller = require("./../Controllers/spoiledController");

spoiledRouter
  .route("/spoliedProducts/:id?")
  .get(controller.getAllSpoiledProductsOrOne)
  .post(validatePostData(), controller.addSpoiledProduct)
  .put(validatePutData(), controller.updateSpoiledProduct)
  .delete(validateDeleteData(), controller.deleteSpoiledProduct);

module.exports = spoiledRouter;
