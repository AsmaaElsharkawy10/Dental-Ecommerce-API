const { mongoose } = require("mongoose");


const customerSchema = new mongoose.Schema({
  fullName:{type:String,required:true},
  customerPhone: { type: String, required: true },
  customerEmail: {
    type: String,
    required: true,
    match: [
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
      "Please enter a valid email",
    ],
  },
  image:String,
  customerPassword: { type: String, required: true },
  confirmPassword:{ type: String, required: false },
  customerTotalPurchase: { type: Number},
  Orders: [{ type: Number, ref: "Orders" }],
  customerAddress:{type:{country:String,city:String,streetName:String,buildingNumber:Number,floorNumber:Number}},
  role: {type:String, enum: ["Doctor", "Merchant"], required: true },

});



//2-register for schema in mongoos
const Customers=mongoose.model("Customers", customerSchema);
module.exports = Customers;