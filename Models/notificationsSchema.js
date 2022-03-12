const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);

const notificationsSchema = new mongoose.Schema({
  _id: {type:Number , alias:"notificationId"},
  name: String,
  customerId: { type: Number, ref: 'customers', required: true },
 productId: { type: Number, ref: 'product', required: true },
  status: {
    type: String,
    enum: ['inProgress', 'completed', 'underRevison'],
    required: true,
  },
  totalPrice: Number,
  type: {type:String, enum: ["selling", "purchase"]},
});

notificationsSchema.plugin(autoIncrement, { inc_field: 'notificationId' });
const Notifications = mongoose.model('Notifications', notificationsSchema);

module.exports = Notifications;
