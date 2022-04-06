const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);
const bcrypt = require('mongoose-bcrypt');

const ordersSchema = new mongoose.Schema({
  _id: Number,
  customerId: { type: Number, ref: "customers", required: true },
  status: {
    type: String,
    enum: ["inProgress", "completed", "underRevison"],
    required: true,
  },
  addressId: { type: Number, ref: "Addresses", required: true },
  storesId: { type: Number, ref: "Stores", required: true },
  flyboyId: { type: Number, ref: "Flyboy", required: true },
  ordersDate: {
    requestDate: { type: Date },
    deliverDate: { type: Date },
  },
});

ordersSchema.plugin(autoIncrement, {
  id: "employees count",
  inc_field: "_id",
});
ordersSchema.plugin(bcrypt);

const Orders = mongoose.model("Orders", ordersSchema);

module.exports = Orders;
