const mongoose = require("mongoose");
const AutoIncrementId = require("mongoose-sequence")(mongoose);

const spoiledSchema = new mongoose.Schema({
    _id: { type: Number, alias: "spoiledId" }, 
    storeId:{ type:Number,required:true },
    receiptId: { type: Number, ref:"receipts", required:true},
    spoiledProducts: [{ type: String, required:true}]
    
})

spoiledSchema.plugin(AutoIncrementId, { inc_field: "spoiledId" });
const spoiledProucts = mongoose.model("spoiledProducts", spoiledSchema);

module.exports = spoiledProucts;