const router = require('express').Router();
const {
  getAllOrders,
  createOrders,
  updateOrders,
  removeOrders,
} = require('../Controllers/ordersController');
const {
  postOrders,
  putOrders,
  deleteOrder,
} = require('../Services/ordersService');
router
  .route('/orders/:id?')
  .get(getAllOrders)
  .post(postOrders(), createOrders)
  .put(putOrders(), updateOrders)
  .delete(deleteOrder(), removeOrders);
module.exports = router;
