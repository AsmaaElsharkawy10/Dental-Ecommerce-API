const mongoose = require("mongoose");
const AutoIncrement= require("mongoose-sequence")(mongoose);

const vendorSchema = new mongoose.Schema({
    _id:{type:Number , alias:"vendorId"},
    vendorName:{type:String,required:true},
    phoneNumber:{type:String , required:true},
    companyName:{type:String},
    country:{type:String},
    receiptId:{type:Number , ref:"receipts"},
})

vendorSchema.plugin(AutoIncrement,{inc_field:"vendorId"})

const Vendor = mongoose.model("vendors",vendorSchema)
module.exports = Vendor;