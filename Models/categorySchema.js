const mongoose =require("mongoose");
const autoIncrement = require('mongoose-sequence')(mongoose);
// building schema 
const categorySchema= new mongoose.Schema({

    _id:{type:Number},
    name:{type:String,required:true},
    image:{type:String},
});

categorySchema.plugin(autoIncrement,{
    id:"category count",
    inc_field:"_id"
})
// register schema for mongoo
const Category=mongoose.model("Category",categorySchema);
module.exports=Category;
