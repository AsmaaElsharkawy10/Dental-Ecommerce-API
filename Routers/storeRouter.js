const express = require("express");
const storeRouter = express.Router();


const {
  getAllStoresOrOne,
  addStore,
  updateStore,
  deleteStore
} = require("../Controllers/storeController");
const {
  validatePostData,
  validatePutData,
  validateDeleteData,
} = require("../Services/storeService");
const status = express.Router();
status
.route("/stores")
.get(getAllStoresOrOne)
  .post(validatePostData(), addStore)
status.put("/stores/:_id",validatePutData(),updateStore)
status.delete("/stores/:_id",validateDeleteData(), deleteStore);


module.exports = status;

