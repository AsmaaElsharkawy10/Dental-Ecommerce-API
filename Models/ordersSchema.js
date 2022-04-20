const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);

const ordersSchema = new mongoose.Schema({
  _id: { type: Number, alias: "orderId" },
  customerId: { type: Number, ref: "Customers", required: true },
  status: {
    type: String,
    enum: ["inProgress", "completed", "underRevison"],
    required: true,
  },
  receipt: {
    total: { type: Number, required: true },
    products: [[{ type: Number, ref: 'products' }]]
  },
  ordersDate: {
    requestDate: { type: Date },
    deliverDate: { type: Date },
  },
});

ordersSchema.plugin(autoIncrement, { inc_field: "orderId", });

const Orders = mongoose.model("orders", ordersSchema);

module.exports = Orders;
















// const ordersSchema = new mongoose.Schema({
//   _id: Number,
//   customerId: { type: Number, ref: "Customers", required: true },
//   status: {
//     type: String,
//     enum: ["inProgress", "completed", "underRevison"],
//     required: true,
//   },
//   addressId: { type: Number, ref: "Addresses", required: true },
//   storesId: { type: Number, ref: "Stores", required: true },
//   flyboyId: { type: Number, ref: "Flyboy", required: true },
//   ordersDate: {
//     requestDate: { type: Date },
//     deliverDate: { type: Date },
//   },
// });

// ordersSchema.plugin(autoIncrement, {
//   id: "employees count",
//   inc_field: "_id",
// });