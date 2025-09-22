const e = require('express');
const mongoose = require('mongoose');

const healthRecordSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true },
    weight: { type: Number, required: true },
    bloodPressure: { type: String, required: true },
    bloodSugar: { type: Number, required: true },
    notes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('HealthRecord', healthRecordSchema);
exports.healthRecordSchema = healthRecordSchema;