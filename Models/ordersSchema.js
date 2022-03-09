const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);

const ordersSchema = new mongoose.Schema({
  _id: Number,
  customerId: { type: Number, ref: 'customers', required: true },
  status: {
    type: String,
    enum: ['inProgress', 'completed', 'underRevison'],
    required: true,
  },
  addressId: { type: Number, ref: 'Addresses', required: true },
  storesId: { type: Number, ref: 'Stores', required: true },
  flyboyId: { type: Number, ref: 'Flyboy', required: true },
  ordersDate: {
    requestDate: { type: Date, required: true },
    deliverDate: { type: Date, required: true },
  },
});

const Orders = mongoose.model('Orders', ordersSchema);

ordersSchema.plugin(autoIncrement, { inc_field: '_id' });
module.exports = Orders;
