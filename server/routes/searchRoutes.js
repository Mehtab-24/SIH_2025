// Express router for /api/search endpoints

const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

// GET /api/search
router.get('/', searchController.searchRecords);

module.exports = router;