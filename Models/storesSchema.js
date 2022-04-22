const mongoose = require("mongoose");
const AutoIncrementId = require("mongoose-sequence")(mongoose);

const storeSchema = new mongoose.Schema({
    _id: { type: Number, alias: "storeId" }, 
    storeName: {type:String , required:true},
    storePhone: String,
    storeAddress:{type:{ storeCity:String,storeStreet:String}},

    storeRent:String,
    storeEmployeesId:[ { type: Number, ref: "Employees", required:true}],
    storeCategoriesId: [{ type: Number, ref: "Category", required:true}],
    // returnedProductsId:[{type:Number, ref:"returnsProudcts" }]
})

storeSchema.plugin(AutoIncrementId, { inc_field: "storeId" });
const Store = mongoose.model("stores", storeSchema);
module.exports = Store;