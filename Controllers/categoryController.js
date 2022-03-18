
const {body,query,param}=require("express-validator");
const bcrypt = require("bcrypt");
const Category = require("../Models/categorySchema");
exports.getAllCategorys = (request,response,next) => {
    Category.find({})
        .then((data)=>{
            response.status(200).json(data)
        }).catch(err=>{next(err+"cant show Category")})    
      
}
exports.getCategoryById = (request,response,next) => {
    Category.findOne({_id:request.body._id})
    .then((data)=>{
        response.status(200).json(data)
    }).catch(err=>{next(err)})    
  
}
exports.createCategory=(request,response,next)=>{
     let { name, image} = request.body;
     let newCategory = new Category({
       
        name,
        image,
      })
    newCategory.save()
          .then(data=>{
            response.status(201).json({message:"added",data})
          })
          .catch(error=>next(error +"this is wrong"))    
}
exports.updateCategory=(request,response,next)=>{
    let { name, image} = request.body;
    Category.updateOne({ _id:request.body._id },{
        name,
        image,
}
).then(data=>{
if(data.modifiedCount==0)throw new Error("Category not found")
    response.status(200).json({message:"updated",data})
})
.catch(error=>next(error))
  
};
exports.deleteCategory=(request,response,next)=>{
    Category.findOneAndDelete({ _id:request.body._id })  
  .then(data=>{
      if(data.modifiedCount==0)throw new Error("Category not found")
          response.status(200).json({message:"deleted",data})
      })
      .catch(error=>next(error))

}


   