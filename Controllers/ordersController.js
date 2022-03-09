const Orders = require('../Models/ordersSchema');
const { validationResult } = require('express-validator');

module.exports.getAllOrders = async (req, res, next) => {
  const allOrders = await Orders.find({})
    .then(() => res.status(200).json(allOrders))
    .catch((e) => next(e));
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
  newOrder
    .save()
    .then((data) => {
      response.status(201).json({ message: 'added', data });
    })
    .catch((error) => next(error + 'wrong'));
};
