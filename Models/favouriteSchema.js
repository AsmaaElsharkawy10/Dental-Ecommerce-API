const mongoose =require("mongoose");
const autoincremint = require('mongoose-sequence')(mongoose);
// building schema 
const favouriteSchema= new mongoose.Schema({
    _id:Number,
    ownerId:{type:mongoose.Schema.Types.ObjectId,ref:'Customers'},
    favouriteProducts:[{type:Number,ref:'products'}]  
});

favouriteSchema.plugin(autoincremint,{
    id:"favoirite count",
    inc_field:"_id"
})

// register schema for mongoo
const favourite=mongoose.model("favourite",favouriteSchema);
module.exports=favourite;
