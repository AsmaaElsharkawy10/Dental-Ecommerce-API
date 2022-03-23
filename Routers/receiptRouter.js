const express = require("express");
const receiptRouter = express.Router();

const { getAllReceiptsOrOne, createReceipt, updateReceipt,
        removeReceipt} = require("../Controllers/receiptController");
const {postReceipt,putReceipt,deleteReceipt} = require("../Services/receiptService");

receiptRouter
  .route("/receipts/:id?")
  .get(getAllReceiptsOrOne)
  .post(postReceipt(),createReceipt)
  .put(putReceipt(), updateReceipt)
  .delete(deleteReceipt(), removeReceipt);

module.exports = receiptRouter;
