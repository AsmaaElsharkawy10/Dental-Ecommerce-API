const Store = require("../Models/stores.model");
const {validationResult} = require("express-validator")

    /*------------------------------- Get AllStores or One-------------------------------*/ 
    module.exports.getAllStoresOrOne = async (request, response, next) => {
    try {
        // check param id sent
        if (request.params.id) {
        const store = await Store.findOne({ stores_id: request.params.id }).populate(["storeEmployees","storeCategories"]);
        response.json(store);
        } 
        else {
        const stores = await Store.find().populate(["storeEmployees","storeCategories"]);
        response.json(stores);
        }
    } 
    catch{
        (error) => next(error)
        }
    };
    /*------------------------------- Add Store-------------------------------*/ 
    module.exports.addStore = async (request, response, next) => {
    let errors = validationResult(request);
        if (!errors.isEmpty()) {
            let error = new Error();
            error.status = 422;
            error.message = errors.array().reduce((current, object) => current + object.msg + " ", "");
            throw error;
        }

                    let newStore = new Store({
                        storeName: request.body.storeName,
                        storePhone: request.body.storePhone,
                        storeAddress: request.body.storeAddress,
                        storeRent: request.body.storeRent,
                        storeEmployees: request.body.storeEmployees,
                        storeCategories: request.body.storeCategories
                    });
                    newStore.save()
                        .then((data) => {
                            response.status(200).json({ message: "store added", data });
                        })
                        .catch((error) => next(error));
                } 

        /*------------------------------- Update Store-------------------------------*/
        exports.updateStore = (request,response,next)=> {
        let errors=validationResult(request);
        if(!errors.isEmpty())
        {
            let error=new Error();
            error.status=422; 
            error.message=errors.array().reduce((current,object)=>current+object.msg+" ","")
            throw error;
            
        }
            Store.updateOne({ stores_id: request.params.id },{
                $set:{
                    storeName:request.body.storeName,
                    storePhone: request.body.storePhone,
                    storeAddress: request.body.storeAddress,
                    storeRent: request.body.storeRent,
                    storeEmployees: request.body.storeEmployees,
                    storeCategories: request.body.storeCategories
                }
            })
                    .then(data=>{
                        if(data==null) throw new Error("Store not Found!")
                        response.status(200).json({message:"store updated",data})

                    })
                    .catch(error=>next(error))
    }
    /*------------------------------- Delete Store-------------------------------*/ 
    exports.deleteStore = (request, response, next) => {
                Store.deleteOne({ stores_id: request.params.id })
                .then((data) => {
                    if (data == null) throw new Error("Store not Found!");
                    response.status(200).json({ message: "store deleted", data });
                })
                .catch((error) => next(error))
            }
