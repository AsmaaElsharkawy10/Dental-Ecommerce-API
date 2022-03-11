const {validationResult}=require("express-validator");
const {body,query,param}=require("express-validator");
const bcrypt = require("bcrypt");
const Flyboy = require("../Models/flyboySchema");
exports.getAllFlyboy = (request,response,next) => {
    Flyboy.find({}).populate({path:"employee"})
        .then((data)=>{
            response.status(200).json(data)
        }).catch(err=>{next(err+"cant show Flyboy")})    
      
}
exports.getFlyboyById = (request,response,next) => {
    Flyboy.findOne({_id:request.body._id})
    .then((data)=>{
        response.status(200).json(data)
    }).catch(err=>{next(err)})    
  
}
exports.createFlyboy=(request,response,next)=>{
     let errors=validationResult(request);
     if(!errors.isEmpty())
     {
            let error=new Error();
            error.status=422;
            error.message=errors.array().reduce((current,object)=>current+object.msg+" ","")
            throw error;
     }
     let { username, password,email} = request.body;
     let newFlyboy = new Flyboy({
        username,
        password,
        email
      })
      newFlyboy.save()
          .then(data=>{
            response.status(201).json({message:"added",data})
          })
          .catch(error=>next(error +"this is wrong"))    
}
exports.updateFlyboy=(request,response,next)=>{
    let { username, password,email} = request.body;
  Flyboy.updateOne({ _id:request.param._id },{
   username,
        password,
        email
}
).then(data=>{
if(data.modifiedCount==0)throw new Error("Flyboy not found")
    response.status(200).json({message:"updated",data})
})
.catch(error=>next(error))
  
};
exports.deleteFlyboy=(request,response,next)=>{
    Flyboy.findOneAndDelete({ _id:request.param._id })  
  .then(data=>{
      if(data.modifiedCount==0)throw new Error("Flyboy not found")
          response.status(200).json({message:"deleted",data})
      })
      .catch(error=>next(error))

}


   