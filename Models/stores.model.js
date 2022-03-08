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
    storeEmployees: [{ type: Number, ref: "employees" }],
    storeCategories: [{ type: Number, ref: "categories" }]
})

schema.plugin(AutoIncrementId, { inc_field: "stores_id" });
const Store = mongoose.model("stores", schema);

module.exports = Store;