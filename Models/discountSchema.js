const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const discountSchema = new mongoose.Schema({
    _id:{type:Number , alias:"discountId"},
    discountAmount:{type:Number , required:true},
    date:{
        from:{type:Date,required:true},
        to:  {type:Date,required:true}
    },
    style:{
        fontColor:{type:String},
        layoutColor:{type:String} 
    }
});

discountSchema.plugin(AutoIncrement, {inc_field: "discountId" });
const Discount = mongoose.model("discounts", discountSchema);
module.exports = Discount;
