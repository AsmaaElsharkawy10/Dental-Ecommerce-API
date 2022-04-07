const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const receiptSchema = new mongoose.Schema({
  _id: { type: Number , alias: "receiptId"},
  purchaserName: {type:String , required:true},
  orderId: {type:Number,ref:"orders"},
  date: {type:Date,required:true},
  status: {type:String,enum:["paid","owed"]},
  totalPrice: {type:Number , required:true},
  type: {type:String, enum: ["selling", "buying"]},
  products:[{type:Number,ref:"products"}]
});

receiptSchema.plugin(AutoIncrement, {inc_field: "receiptId" });
const Receipt = mongoose.model("receipts", receiptSchema);
module.exports = Receipt;