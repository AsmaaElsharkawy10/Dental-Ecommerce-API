const express = require("express");
const storeRouter = express.Router();


const {
  validatePostData,
  validatePutData,
  validateDeleteData,
} = require("../Services/storeService");
const controller = require("./../Controllers/storeController");


storeRouter
  .route("/stores/:id?")
  .get(controller.getAllStoresOrOne)
  .post(validatePostData(), controller.addStore)
  .put(validatePutData(), controller.updateStore)
  .delete(validateDeleteData(), controller.deleteStore);

module.exports = storeRouter;
