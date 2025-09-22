// Express router for /api/analytics endpoints

const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');

// GET /api/analytics/summary
router.get('/summary', analyticsController.getSummary);

// GET /api/analytics/trends
router.get('/trends', analyticsController.getTrends);

module.exports = router;