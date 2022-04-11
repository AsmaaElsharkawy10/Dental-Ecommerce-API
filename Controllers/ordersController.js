const Orders = require('../Models/ordersSchema');
const { validationResult } = require('express-validator');

const bcrypt = require('bcrypt');

module.exports.getAllOrders = async (req, res, next) => {
  try {
    if (req.params.id) {
      const order = await Orders.findById(req.params.id);
      res.json(order);
    } else {
      const orders = await Orders.find();
      res.json(orders);
    }
  } catch (err) {
    next('error find');
  }
};

module.exports.createOrders = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let error = new Error();
    error.status = 422;
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + ' ', '');
    throw error;
  }
  const { _id, customerId, status, addressId, storesId, flyboyId, ordersDate } =
    req.body;
  const newOrder = new Orders({
    _id,
    customerId,
    status,
    addressId,
    storesId,
    flyboyId,
    ordersDate,
  });

  const orderData = await newOrder.save();
  res.json({ msg: 'orders added', orderData });
};

module.exports.updateOrders = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let error = new Error();
    error.status = 422;
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + ' ', '');
    throw error;
  }

  const { _id, customerId, status, addressId, storesId, flyboyId, ordersDate } =
    req.body;

  try {
    const order = await Orders.findById(_id);

    if (!order) res.json({ msg: 'no orders' });

    order.customerId = customerId;
    order.status = status;
    order.addressId = addressId;
    order.storesId = storesId;
    order.flyboyId = flyboyId;
    order.ordersDate = ordersDate;

    const updatedOrder = await order.save();

    res.json({ msg: 'order updated', updatedOrder });
  } catch (err) {
    next(err);
  }
};

module.exports.removeOrders = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let error = new Error();
    error.status = 422;
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + ' ', '');
    throw error;
  }
  const {id} = req.params;
  try {
    const deletedOrder = await Orders.deleteOne({ _id: id });
    res.send({ msg: 'Order deleted', deletedOrder });
  } catch (err) {
    next(err.message);
  }
};
