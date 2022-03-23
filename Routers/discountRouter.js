const express = require("express");
const discountRouter = express.Router();

const { getAllDiscountsOrOne, createDiscount, updateDiscount,
        removeDiscount} = require("../Controllers/dicsountController");
const {postDiscount,putDiscount,deleteDiscount} = require("../Services/discountService");

discountRouter
  .route("/discounts/:id?")
  .get(getAllDiscountsOrOne)
  .post(postDiscount(),createDiscount)
  .put(putDiscount(), updateDiscount)
  .delete(deleteDiscount(), removeDiscount);

module.exports = discountRouter;
