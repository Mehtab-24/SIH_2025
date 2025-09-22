// Handles search API requests.
// Calls searchService for actual business logic.

const searchService = require('../services/searchService');

/**
 * GET /api/search
 * Supports filters: name, disease, location, date range, pagination.
 */
exports.searchRecords = async (req, res) => {
  try {
    // Extract filters and pagination from query parameters
    const {
      name,
      disease,
      location,
      startDate,
      endDate,
      page = 1,
      pageSize = 20,
    } = req.query;

    const filters = { name, disease, location, startDate, endDate };
    const pagination = { page: Number(page), pageSize: Number(pageSize) };

    const result = await searchService.searchRecords(filters, pagination);
    res.json({
      success: true,
      total: result.total,
      items: result.items,
      page: pagination.page,
      pageSize: pagination.pageSize,
    });
  } catch (err) {
    console.error('Search error:', err);
    res.status(500).json({ success: false, error: 'Internal server error.' });
  }
};