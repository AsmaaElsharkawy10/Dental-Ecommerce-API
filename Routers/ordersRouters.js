const ordersRouter = require('express').Router();
const {
  getAllOrders,
  createOrders,
} = require('../Controllers/ordersController');
const { postOrders } = require('../Services/ordersService');
ordersRouter
  .route('D/:id?')
  .get(getAllOrders)
  .post(postOrders(), createOrders);

module.exports = ordersRouter;
