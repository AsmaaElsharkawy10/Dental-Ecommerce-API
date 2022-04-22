const Store = require("../Models/storesSchema");
const {validationResult} = require("express-validator")

    /*------------------------------- Get AllStores or One-------------------------------*/ 

    module.exports.getAllStoresOrOne = async (request, response, next) => {
    try {
        
        if (request.params.id) {
        const store = await Store.findById( request.params.id ).populate({path:'storeEmployeesId'}).populate({path:'storeCategoriesId'})
        response.json(store);
        } 
        else {
        const stores = await Store.find({}).populate({path:'storeEmployeesId'}).populate({path:'storeCategoriesId'})
        response.json(stores);
        }
    } 
    catch{
        (error) => next(error)
        }
    };
    /*------------------------------- Add Store-------------------------------*/ 
    
exports.addStore=(request,response,next)=>{
  const {storeName, storePhone ,storeRent,storeEmployeesId,storeCategoriesId } = request.body;
  const storeAddress=JSON.parse(request.body.storeAddress);
  const newStore = new Store({
    storeName,
    storePhone,
    storeAddress,
    storeRent,
    storeEmployeesId,
    storeCategoriesId,
   })
  
   newStore.save()
       .then(data=>{
        Store = Store.find({})
   })
       .catch(error=>next(error +"this is wrong"))    
}
   

        /*------------------------------- Update Store-------------------------------*/
        exports.updateStore=(request,response,next)=>{
          const { 
            storeName, 
            storePhone,
            storeRent,
            storeEmployeesId,
            storeCategoriesId,
             
          } = request.body;
          const storeAddress=JSON.parse(request.body.storeAddress);

          Store.updateOne({ _id:request.params._id },{
            storeName, 
            storePhone, 
            storeAddress,
            storeRent,
            storeEmployeesId,
            storeCategoriesId,
      }
      ).then(data=>{
      if(data.modifiedCount==0)throw new Error("store not found")
          response.status(200).json({message:"updated",data})
      })
      .catch(error=>next(error))
        
      };
       

      
    /*------------------------------- Delete Store-------------------------------*/ 
    exports.deleteStore=(request,response,next)=>{
      Store.findOneAndDelete({ _id:request.params._id })  
    .then(data=>{
        if(data.modifiedCount==0)throw new Error("Store not found")
            response.status(200).json({message:"deleted",data})
        })
        .catch(error=>next(error ))
  
  }


  // module.exports.addStore = async (request, response, next) => {
  //   let errors = validationResult(request);
  //       if (!errors.isEmpty()) {
  //           let error = new Error();
  //           error.status = 422;
  //           error.message = errors.array().reduce((current, object) => current + object.msg + " ", "");
  //           throw error;
  //       }
  //       const {storeName, storePhone ,storeAddress,storeRent,storeEmployeesId,storeCategoriesId } = request.body;
  //         const newStore = new Store({
  //           storeName,
  //           storePhone,
  //           storeAddress,
  //           storeRent,
  //           storeEmployeesId,
  //           storeCategoriesId,
            
  //         });

  //         const storeData = await newStore.save();
  //         response.json(storeData);
  //       }
        // module.exports.deleteStore = async(request, response, next) => {
        // let errors=validationResult(request);
        // if(!errors.isEmpty())
        // {
        //     let error=new Error();
        //     error.status=422; 
        //     error.message=errors.array().reduce((current,object)=>current+object.msg+" ","")
        //     throw error;
            
        // }
        // const { _id } = request.params;
        //     try {
        //         const deletedStore = await Store.deleteOne({ _id: _id });
        //         response.send({ msg: "store deleted", deletedStore });
        //     } 
        //     catch (error) {
        //         next(error.message);
        //     }
        //     };


