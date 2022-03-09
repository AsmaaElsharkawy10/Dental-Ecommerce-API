const mongoose = require("mongoose");
const AutoIncrementId = require("mongoose-sequence")(mongoose);

const schema = new mongoose.Schema({
    storeId: Number, 
    storeName: {type:String , required:true},
    storePhone: String,
    storeAddress: {
    storeCity: { type: String },
    storeStreet: { type: String },
    },
    storeRent:String,
    storeEmployeesId: [{ type: Number, ref: "employees", required:true}],
    storeCategoriesId: [{ type: Number, ref: "categories", required:true}]
})

schema.plugin(AutoIncrementId, { inc_field: "stores_id" });
const Store = mongoose.model("stores", schema);

module.exports = Store;