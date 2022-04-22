const { mongoose } = require("mongoose");


//const bcrypt = require('mongoose-bcrypt');
//const autoincremint = require('mongoose-sequence')(mongoose);

// building schema 
const EmployeeSchema= new mongoose.Schema({
    email:{type:String,required:true,unique:true ,  
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    fullName:{type:String,required:true},
    password:{type:String,bcrypt:true,required:true},
//    image:{type:String},
    phone:{type:Number,required:true},
    workHour:{type:Number,required:true},
    gender:{type:String,enum: ['male','female'],required:true},
    militarystatus:{type:String,required:true},
    dateOfEmployment:{type:String,required:true},
    address: {
        city: { type: String },
        street: { type: String },
        building: { type: Number },  
      },
    position:{type:String}
});



//2-register for schema in mongoos
const Employees=mongoose.model("Employees", EmployeeSchema);
module.exports = Employees;