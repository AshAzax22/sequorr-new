const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const Journal = require('../models/Journal');
const DailyScore = require('../models/DailyScore');

const router = express.Router();

// @route   GET /api/journal
// @desc    Fetch past encrypted journals for the logged-in user
router.get('/', protect, async (req, res) => {
    try {
        const journals = await Journal.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(journals);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching journals' });
    }
});

// @route   POST /api/journal
// @desc    Save a new E2EE journal & update fusion DailyScore
router.post('/', protect, async (req, res) => {
    const { encryptedText, emotionScores, remarks } = req.body;
    
    try {
        const journal = await Journal.create({
            user: req.user._id,
            encryptedText,
            emotionScores, // Example: {"sadness": 0.8, "joy": 0.1}
            remarks
        });

        // --- Fusion Engine Step ---
        const today = new Date().toISOString().split('T')[0]; // "YYYY-MM-DD"
        let dailyScore = await DailyScore.findOne({ user: req.user._id, date: today });
        
        // --- PATHWAY MAPPING LOGIC ---
        const mapToPathway = (scores) => {
            if (!scores || Object.keys(scores).length === 0) return "Quiet Valley";
            
            // Find the emotion with the highest score
            let maxEmotion = "neutral";
            let maxScore = -1;
            
            for (const [emo, val] of Object.entries(scores)) {
                if (val > maxScore) {
                    maxScore = val;
                    maxEmotion = emo;
                }
            }
            
            const e = maxEmotion.toLowerCase();
            if (["happy", "joy", "surprised"].includes(e)) return "Sunlit Path";
            if (["neutral", "calm"].includes(e)) return "Quiet Valley";
            if (["angry", "disgusted", "frustrated", "anger"].includes(e)) return "Storm Shelter";
            if (["sad", "sadness", "sorrow"].includes(e)) return "Reflective Lake";
            if (["fearful", "anxious", "fear"].includes(e)) return "Safe Harbor";
            return "Quiet Valley";
        };

        const pathway = mapToPathway(emotionScores);

        // Naive weighting factor: scale text emotion against a baseline of 50
        let scoreMod = 0;
        if (emotionScores && (emotionScores.sadness || emotionScores.sad)) scoreMod -= 10;
        if (emotionScores && (emotionScores.joy || emotionScores.happy)) scoreMod += 10;

        if (!dailyScore) {
            dailyScore = await DailyScore.create({
                user: req.user._id,
                date: today,
                score: Math.min(100, Math.max(0, 50 + scoreMod)), // baseline 50
                factors: { journalCount: 1, faceDetectionsCount: 0 },
                emotionTallies: {
                    "Sunlit Path": pathway === "Sunlit Path" ? 1 : 0,
                    "Quiet Valley": pathway === "Quiet Valley" ? 1 : 0,
                    "Storm Shelter": pathway === "Storm Shelter" ? 1 : 0,
                    "Reflective Lake": pathway === "Reflective Lake" ? 1 : 0,
                    "Safe Harbor": pathway === "Safe Harbor" ? 1 : 0
                }
            });
        } else {
            dailyScore.score = Math.min(100, Math.max(0, dailyScore.score + scoreMod));
            dailyScore.factors.journalCount += 1;

            // Update Tally
            const currentTally = dailyScore.emotionTallies.get(pathway) || 0;
            dailyScore.emotionTallies.set(pathway, currentTally + 1);

            await dailyScore.save();
        }

        res.status(201).json(journal);
    } catch (error) {
        res.status(500).json({ message: 'Error saving journal' });
    }
});

module.exports = router;
