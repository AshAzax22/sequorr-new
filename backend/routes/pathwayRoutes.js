const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const PathwayMessage = require('../models/PathwayMessage');

const router = express.Router();

// @route   GET /api/pathway/:room
// @desc    Fetch messages for a specific mood pathway
router.get('/:room', protect, async (req, res) => {
    try {
        const messages = await PathwayMessage.find({ room: req.params.room })
            .populate('user', 'name')
            .sort({ createdAt: -1 })
            .limit(50);
        res.json(messages.reverse());
    } catch (error) {
        res.status(500).json({ message: 'Error fetching messages' });
    }
});

// @route   POST /api/pathway/:room
// @desc    Post a message to a mood pathway
router.post('/:room', protect, async (req, res) => {
    try {
        const { content } = req.body;
        const message = await PathwayMessage.create({
            user: req.user._id,
            room: req.params.room,
            content
        });
        
        const populatedMessage = await message.populate('user', 'name');
        res.status(201).json(populatedMessage);
    } catch (error) {
        res.status(500).json({ message: 'Error posting message' });
    }
});

module.exports = router;
