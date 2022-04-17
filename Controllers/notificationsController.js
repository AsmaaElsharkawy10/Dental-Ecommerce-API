const Notifications = require('../Models/notificationsSchema');
const { validationResult } = require('express-validator');

module.exports.getAllNotifications = async (req, res, next) => {
  try {
    if (req.params.id) {
      const notifications = await Notifications.findById(req.params.id);
      res.json(notifications);
    } else {
      const notifications = await Notifications.find();
      res.json(notifications);
    }
  } catch (err) {
    next('error find');
  }
};

module.exports.createNotifications = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let error = new Error();
    error.status = 422;
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + ' ', '');
    throw error;
  }
  const { _id, name, customerId, productId, status, totalPrice, type } =
    req.body;
  const newNotifications = new Notifications({
    _id,
    name,
    customerId,
    productId,
    status,
    totalPrice,
    type,
  });

  const notificationData = await newNotifications.save();
  res.json({ msg: 'notification added', notificationData });
};

module.exports.updateNotifications = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let error = new Error();
    error.status = 422;
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + ' ', '');
    throw error;
  }

  const { _id, name, customerId, productId, status, totalPrice, type } =
    req.body; 
 
  try {
    const notification = await Notifications.findById(_id);

    if (!notification) res.json({ msg: 'no notifications' });

    notification.name = name;
    notification.customerId = customerId;
    notification.productId = productId;
    notification.status = status;
    notification.totalPrice = totalPrice;
    notification.type = type;

    const updatedNotification = await notification.save();

    res.json({ msg: 'notification updated', updatedNotification });
  } catch (err) {
    next(err);
  }
};


module.exports.removeNotifications = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let error = new Error();
    error.status = 422;
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + ' ', '');
    throw error;
  }
  const { _id } = req.body;
  try {
    const deletedNotification = await Notifications.deleteOne({ _id: _id });
    res.send({ msg: 'notification deleted', deletedNotification });
  } catch (err) {
    next(err.message);
  }
};
