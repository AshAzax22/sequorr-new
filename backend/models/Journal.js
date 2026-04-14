const mongoose = require('mongoose');

const journalSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    encryptedText: { type: String, required: true }, // The E2E Encrypted string of what they wrote
    emotionScores: { 
        type: Map, 
        of: Number  // Map of detected offline emotions (e.g., {"sadness": 0.8})
    },
    remarks: { type: String } // High level trigger (e.g. "Work anxiety detected")
}, { timestamps: true });

module.exports = mongoose.model('Journal', journalSchema);
