const express = require('express');
const { sendSMSNotification, sendEmailNotification } = require('../controllers/notificationController');

const router = express.Router();

router.post('/sms', sendSMSNotification);
router.post('/email', sendEmailNotification);

module.exports = router;
