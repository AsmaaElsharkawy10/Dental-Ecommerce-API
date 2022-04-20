const { body } = require('express-validator');

module.exports.postOrders = () => {
  return [
    body('customerId')
      .isNumeric()
      .withMessage('id is required and must be number'),
    body('status').isString().withMessage('please enter status of order'),
    body('receipt').isString().withMessage('please enter address Id'),
    body("ordersDate").isDate().withMessage("Order date must be date formate"),
  ];
};

module.exports.putOrders = () => {
  return [
    body('customerId')
      .isNumeric()
      .withMessage('id is required and must be number'),
    body('status').isString().withMessage('please enter status of order'),
    body('receipt').isString().withMessage('please enter address Id'),
    body("ordersDate").isDate().withMessage("Order date must be date formate"),
  ];
};

module.exports.deleteOrder = () => {
  return body('_id').isAlphanumeric().withMessage('id is not a number');
};
