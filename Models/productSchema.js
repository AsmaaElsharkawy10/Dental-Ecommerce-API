const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const productSchema = new mongoose.Schema({
  _id: { type: Number , alias: "productId"},
  productName: {type:String , required:true},
  expirationDate: {type:Date,required:true},
  company: {type:String,required:true},
  price: {type:Number , required:true},
  quantity: {type:Number , required:true},
  image: {type:String},
  countryOfManufacture:{type:String,required:true},
  description: {type:String , required:true},
  category:{type:Number,ref:"Category"},
  discount:{type:Number,ref:"discounts"},
  rating:{type:Number}
});

productSchema.plugin(AutoIncrement, {inc_field: "productId" });
const Product = mongoose.model("products", productSchema);
module.exports = Product;
