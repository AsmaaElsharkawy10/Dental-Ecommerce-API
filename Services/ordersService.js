const { body } = require('express-validator');

module.exports.postOrders = () => {
  return [
    //    body("_id").isInt().withMessage("id is required and must be number"),
    body('customerId')
      .isNumeric()
      .withMessage('id is required and must be number'),
    body('status').isString().withMessage('please enter status of order'),
    body('addressId').isNumeric().withMessage('please enter address Id'),
    body('storesId').isNumeric().withMessage('please enter stores Id'),
    body('flyboyId').isNumeric().withMessage('please enter flyboy Id'),
    //    body("ordersDate").isDate().withMessage("Order date must be date formate"),
  ];
};

module.exports.putOrders = () => {
  return [
    //    body("_id").isInt().withMessage("id is required and must be number"),
    body('customerId')
      .isNumeric()
      .withMessage('id is required and must be number'),
    body('status').isString().withMessage('please enter status of order'),
    body('addressId').isNumeric().withMessage('please enter address Id'),
    body('storesId').isNumeric().withMessage('please enter stores Id'),
    body('flyboyId').isNumeric().withMessage('please enter flyboy Id'),
    //    body("ordersDate").isDate().withMessage("Order date must be date formate"),
  ];
};

module.exports.deleteOrder = () => {
  return body('_id').isAlphanumeric().withMessage('id is not a number');
};
