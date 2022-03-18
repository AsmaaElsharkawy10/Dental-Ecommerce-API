const Store = require("../Models/storesSchema");
const {validationResult} = require("express-validator")

    /*------------------------------- Get AllStores or One-------------------------------*/ 
    module.exports.getAllStoresOrOne = async (request, response, next) => {
    try {
        // check param id sent
        if (request.params.id) {
        const store = await Store.findById( request.params.id ).populate({path:"returnsProudcts"}); 
        response.json(store);
        } 
        else {
        const stores = await Store.find({}).populate({path:"returnedProductsId"})
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
        const {storeName, storePhone ,storeAddress,storeRent,storeEmployeesId,storeCategoriesId,returnedProductsId } = request.body;
          const newStore = new Store({
            storeName,
            storePhone,
            storeAddress,
            storeRent,
            storeEmployeesId,
            storeCategoriesId,
            returnedProductsId
          });

          const storeData = await newStore.save();
          response.json({ msg: "store added", storeData });
        }

        /*------------------------------- Update Store-------------------------------*/
        module.exports.updateStore = async(request,response,next)=> {
        let errors=validationResult(request);
        if(!errors.isEmpty())
        {
            let error=new Error();
            error.status=422; 
            error.message=errors.array().reduce((current,object)=>current+object.msg+" ","")
            throw error;
            
        }
            const { _id,
                    storeName, 
                    storePhone, 
                    storeAddress,
                    storeRent,
                    storeEmployeesId,
                    storeCategoriesId,
                    returnedProductsId 
                  } = request.body;

              try {
                const store = await Store.findById(_id);

                if (!store) response.json({ msg: "store not found" });

                store.storeName = storeName ;
                store.storePhone = storePhone ;
                store.storeAddress = storeAddress ;
                store.storeRent = storeRent ;
                store.storeEmployeesId = storeEmployeesId ;
                store.atoreCategoriesId = storeCategoriesId;
                store.returnedProductsId = returnedProductsId ;

                const updatedStore = await store.save();

                response.json({ msg: "store updated", updatedStore });
              } 
              catch (error) {
                next(error);
              }
            }
    /*------------------------------- Delete Store-------------------------------*/ 
        module.exports.deleteStore = async(request, response, next) => {
        let errors=validationResult(request);
        if(!errors.isEmpty())
        {
            let error=new Error();
            error.status=422; 
            error.message=errors.array().reduce((current,object)=>current+object.msg+" ","")
            throw error;
            
        }
        const { _id } = request.body;
            try {
                const deletedStore = await Store.deleteOne({ _id: _id });
                response.send({ msg: "store deleted", deletedStore });
            } 
            catch (error) {
                next(error.message);
            }
            };


