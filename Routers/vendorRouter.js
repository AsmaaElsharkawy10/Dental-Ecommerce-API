const express = require("express");
const vendorRouter = express.Router();

const { getAllVendorsOrOne, createVendor, updateVendor,
        removeVendor} = require("../Controllers/vendorsController");
const {postVendor,putVendor,deleteVendor} = require("../Services/vendorService");


vendorRouter.route("/vendors/:id?")
  .get(getAllVendorsOrOne)
  .post(postVendor(),createVendor)
  .put(putVendor(), updateVendor)
  .delete(deleteVendor(), removeVendor);

module.exports = vendorRouter;
