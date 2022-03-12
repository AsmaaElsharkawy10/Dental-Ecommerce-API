const mongoose = require("mongoose");
const AutoIncrementId = require("mongoose-sequence")(mongoose);

const returnsSchema = new mongoose.Schema({
    _id: { type: Number, alias: "returnsId" }, 
    storeId:{ type:Number,required:true },
    receiptId: { type: Number, ref:"receipts", required:true},
    returnedProucts: [{ type: String, required:true}]
    
})

returnsSchema.plugin(AutoIncrementId, { inc_field: "returnsId" });
const returnsProucts = mongoose.model("returnsProudcts", returnsSchema);

module.exports = returnsProucts;