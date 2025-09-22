const express = require('express');
const router = express.Router();
const HealthRecord = require('../models/healthRecord');

// ✅ Create a new health record
router.post('/', async (req, res) => {
    try {
        const record = new HealthRecord(req.body);
        await record.save();
        res.status(201).json({ success: true, data: record });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

// ✅ Get all health records (optionally by userId)
router.get('/', async (req, res) => {
    try {
        const query = {};
        if (req.query.userId) query.userId = req.query.userId;

        const records = await HealthRecord.find(query).populate('userId');
        res.json({ success: true, data: records });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// ✅ Get a single health record by ID
router.get('/:id', async (req, res) => {
    try {
        const record = await HealthRecord.findById(req.params.id).populate('userId');
        if (!record) return res.status(404).json({ success: false, message: 'Record not found' });
        res.json({ success: true, data: record });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// ✅ Update a health record
router.put('/:id', async (req, res) => {
    try {
        const record = await HealthRecord.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!record) return res.status(404).json({ success: false, message: 'Record not found' });
        res.json({ success: true, data: record });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

// ✅ Delete a health record
router.delete('/:id', async (req, res) => {
    try {
        const record = await HealthRecord.findByIdAndDelete(req.params.id);
        if (!record) return res.status(404).json({ success: false, message: 'Record not found' });
        res.json({ success: true, message: 'Record deleted successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

module.exports = router;
