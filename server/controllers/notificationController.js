const { sendSMS } = require('../utils/sms');
const { sendEmail } = require('../utils/email');

exports.sendSMSNotification = async (req, res) => {
  const { phone, message } = req.body;
  if (!phone || !message) {
    return res.status(400).json({ error: 'phone and message are required' });
  }
  try {
    await sendSMS(phone, message);
    res.json({ success: true, message: 'SMS sent' });
  } catch (err) {
    res.status(500).json({ error: 'SMS sending failed' });
  }
};

exports.sendEmailNotification = async (req, res) => {
  const { email, subject, text } = req.body;
  if (!email || !subject || !text) {
    return res.status(400).json({ error: 'email, subject and text are required' });
  }
  try {
    await sendEmail(email, subject, text);
    res.json({ success: true, message: 'Email sent' });
  } catch (err) {
    res.status(500).json({ error: 'Email sending failed' });
  }
};
