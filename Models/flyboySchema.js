const mongoose =require("mongoose");
const bcrypt = require('mongoose-bcrypt');
const autoincremint = require('mongoose-sequence')(mongoose);
// building schema 
const flyboySchema= new mongoose.Schema({
    _id:Number,
    username:{type:String,required:true},
    email:{type:String,required:true,unique:true ,  
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password:{type:String,bcrypt:true,required:true},
   
});

flyboySchema.plugin(autoincremint,{
    id:"flyboy count",
    inc_field:"_id"
})
flyboySchema.plugin(bcrypt);
// register schema for mongoo
const flyboy=mongoose.model("flyboy",flyboySchema);
module.exports=flyboy;
