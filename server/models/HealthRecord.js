const mongoose = require('mongoose');

const healthRecordSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },

    // Visit / encounter info
    date: { type: Date, default: Date.now },
    doctor: { type: String },
    department: { type: String },
    reason: { type: String },

    // Basic vitals
    vitals: {
        weight: { type: Number }, // kg
        height: { type: Number }, // cm
        bloodPressure: { type: String }, // e.g., "120/80"
        heartRate: { type: Number }, // bpm
        temperature: { type: Number }, // Celsius
        bloodSugar: { type: Number } // mg/dL
    },

    // Medical notes
    notes: { type: String },

    // Medications prescribed during this visit
    medications: [
        {
            name: { type: String },
            dosage: { type: String }, // e.g., "500mg"
            frequency: { type: String }, // e.g., "Twice daily"
            duration: { type: String } // e.g., "7 days"
        }
    ],

    // Lab results
    labTests: [
        {
            testName: { type: String },
            result: { type: String },
            normalRange: { type: String },
            date: { type: Date, default: Date.now },
            orderedBy: { type: String }
        }
    ],

    // Billing / insurance (optional)
    billing: {
        invoiceId: { type: String },
        amount: { type: Number },
        status: { type: String, enum: ['Paid', 'Pending', 'Cancelled'] }
    }

}, { timestamps: true });

module.exports = mongoose.model('HealthRecord', healthRecordSchema);
