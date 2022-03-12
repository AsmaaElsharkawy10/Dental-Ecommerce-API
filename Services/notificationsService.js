const { body } = require('express-validator');

module.exports.postNotifications = () => {
  return [
    //    body("_id").isInt().withMessage("id is required and must be number"),
    body('name').isString().withMessage('please enter name'),
    body('customerId').isNumeric().withMessage('please enter customer Id'),
    body('productId').isNumeric().withMessage('please enter product Id'),
    body('status').custom((value) => {
      if (['inProgress', 'completed', 'underRevison'].includes(value)) {
        return true;
      }
      throw new Error('status must be inProgress,completed or underRevision');
    }),
    body('totalPrice').isNumeric().withMessage('please enter total price '),
    body('type').custom((value) => {
      if (['selling', 'purchase'].includes(value)) {
        return true;
      }
      throw new Error('type must be selling or purchase');
    }),
  ];
};

module.exports.putNotifications = () => {
  return [
    //    body("_id").isInt().withMessage("id is required and must be number"),
    body('name').isString().withMessage('please enter name'),
    body('customerId').isNumeric().withMessage('please enter customer Id'),
    body('productId').isNumeric().withMessage('please enter product Id'),
    body('status').custom((value) => {
      if (['inProgress', 'completed', 'underRevison'].includes(value)) {
        return true;
      }
      throw new Error('status must be inProgress,completed or underRevision');
    }),
    body('totalPrice').isNumeric().withMessage('please enter total price '),
    body('type').custom((value) => {
      if (['selling', 'purchase'].includes(value)) {
        return true;
      }
      throw new Error('type must be selling or purchase');
    }),
  ];
};

module.exports.deleteNotifications = () => {
  return body('_id').isAlphanumeric().withMessage('id is not a number');
};
