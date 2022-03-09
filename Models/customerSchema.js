const { mongoose } = require("mongoose");
const autoIncrement=require('mongoose-sequence')(mongoose);

const customerSchema = new mongoose.Schema({
  _id: Number,
  fullName:{type:String,required:true},
  customerPhone: { type: Number, required: true },
  customerEmail: {
    type: String,
    required: true,
    match: [
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
      "Please enter a valid email",
    ],
  },
  customerImage: { type: String, required: true },
  customerPassword: { type: String, required: true },
  customerTotalPurchase: { type: Number, required: true },
  Orders: [{ type: Number, ref: "Orders" }],
  customerAddresses: [
    {
      type: Number,
      ref: "Addresses",
    },
  ],
role: {type:String, enum: ["Doctor", "Merchant"], required: true },

});


customerSchema.plugin(autoIncrement,{
  id:"student count",
  inc_field:"_id"
  });

//2-register for schema in mongoos
const Customers=mongoose.model("Customers", customerSchema);
module.exports = Customers;