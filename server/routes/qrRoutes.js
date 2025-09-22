const express = require('express');
const { getQRCode } = require('../controllers/qrController');

const router = express.Router();

router.get('/:id', getQRCode);

module.exports = router;
