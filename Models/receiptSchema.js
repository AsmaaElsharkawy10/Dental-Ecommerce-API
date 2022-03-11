const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const receiptSchema = new mongoose.Schema({
  _id: { type: Number },
  purchaserName: String,
  // orderId: {type:Number,ref:"orders"},
  date: Date,
  status: {type:String,enum:["paid","owed"]},
  totalPrice: Number,
  type: {type:String, enum: ["selling", "buying"]},
  // products:[{type:Number,ref:"products"}]
});

receiptSchema.plugin(AutoIncrement, {inc_field: "_id" });
const Receipt = mongoose.model("receipts", receiptSchema);
module.exports = Receipt;