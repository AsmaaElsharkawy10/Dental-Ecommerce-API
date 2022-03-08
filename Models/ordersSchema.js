const mongoose = require('mongoose');

const ordersSchema = new mongoose.Schema({
  _id: Number,
  customerId: [{ type: Number, ref: 'customers' }],
  status: {
    type: String,
    enum: ['inProgress', 'completed', 'underRevison'],
    required: true,
  },
  addressId: { type: Number, ref: 'Addresses' },
  storesId: { type: Number, ref: 'Stores' },
  flyboyId: { type: Number, ref: 'Flyboy' },
  ordersDate: {
    requestDate: { type: Date },
    deliverDate: { type: Date },
  },
});

const Orders = mongoose.model('Orders', ordersSchema);

module.exports = Orders;
