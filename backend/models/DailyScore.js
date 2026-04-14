const mongoose = require('mongoose');

const dailyScoreSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    date: { type: String, required: true }, // Format "YYYY-MM-DD" for uniqueness check
    score: { type: Number, required: true, default: 50 }, // The Fusion Score: 0 to 100
    factors: {
        faceDetectionsCount: { type: Number, default: 0 },
        journalCount: { type: Number, default: 0 }
    },
    emotionTallies: {
        type: Map,
        of: Number,
        default: {
            "Sunlit Path": 0,
            "Quiet Valley": 0,
            "Storm Shelter": 0,
            "Reflective Lake": 0,
            "Safe Harbor": 0
        }
    }
}, { timestamps: true });

// Ensure only one DailyScore per user per day
dailyScoreSchema.index({ user: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('DailyScore', dailyScoreSchema);
