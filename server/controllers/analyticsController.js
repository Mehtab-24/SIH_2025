// Handles analytics API requests.
// Calls analyticsService for actual business logic.

const analyticsService = require('../services/analyticsService');

/**
 * GET /api/analytics/summary
 * Returns summary stats (total registrations, vaccination, etc.)
 */
exports.getSummary = async (req, res) => {
  try {
    const summary = await analyticsService.getSummaryStats();
    res.json({ success: true, data: summary });
  } catch (err) {
    console.error('Analytics summary error:', err);
    res.status(500).json({ success: false, error: 'Internal server error.' });
  }
};

/**
 * GET /api/analytics/trends
 * Returns trends over time/by region.
 */
exports.getTrends = async (req, res) => {
  try {
    // Accept optional query params for date range, region, etc.
    const { startDate, endDate, region } = req.query;
    const trends = await analyticsService.getTrends({ startDate, endDate, region });
    res.json({ success: true, data: trends });
  } catch (err) {
    console.error('Analytics trends error:', err);
    res.status(500).json({ success: false, error: 'Internal server error.' });
  }
};