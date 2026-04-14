const mongoose = require('mongoose');

const pathwayMessageSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    room: { 
        type: String, 
        required: true,
        enum: ["Sunlit Path", "Quiet Valley", "Storm Shelter", "Reflective Lake", "Safe Harbor"]
    },
    content: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('PathwayMessage', pathwayMessageSchema);
