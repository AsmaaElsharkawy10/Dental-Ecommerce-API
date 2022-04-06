const router = require('express').Router();

const {
  getAllNotifications,
  createNotifications,
  updateNotifications,
  removeNotifications,
} = require('../Controllers/notificationsController');
const {
  postNotifications,
  putNotifications,
  deleteNotifications,
} = require('../Services/notificationsService');

router
  .route('/notifications/:id?')
  .get(getAllNotifications)
  .post(postNotifications(), createNotifications)
  .put(putNotifications(), updateNotifications)
  .delete(deleteNotifications(), removeNotifications);
module.exports = router;
