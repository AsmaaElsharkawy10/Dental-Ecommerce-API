const { body } = require('express-validator');

module.exports.postOrders = () => {
  return [
    body('customerId')
      .isEmpty()
      .withMessage('id is required and must be number'),
    body('status').isString().withMessage('please enter status of order'),
    body('receipt').isObject().withMessage('please enter address Id'),
    body("orderDate").isDate().withMessage("Order date must be date formate"),
  ];
};

module.exports.putOrders = () => {
  return [
    body('customerId')
      .isEmpty()
      .withMessage('id is required and must be number'),
    body('status').isString().withMessage('please enter status of order'),
    body('receipt').isObject().withMessage('please enter address Id'),
    body("orderDate").isDate().withMessage("Order date must be date formate"),
  ];
};

module.exports.deleteOrder = () => {
  return body('_id').isObject().withMessage('id is not a number');
};
