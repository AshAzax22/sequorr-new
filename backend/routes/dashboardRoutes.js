const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const DailyScore = require('../models/DailyScore');
const Journal = require('../models/Journal');

const router = express.Router();

// @route   GET /api/dashboard/heatmap
// @desc    Served heatmap array (DailyScores + daily journal remarks if any)
router.get('/heatmap', protect, async (req, res) => {
    try {
        const scores = await DailyScore.find({ user: req.user._id }).sort({ date: 1 }).limit(30);
        
        const enrichedScores = await Promise.all(scores.map(async (scoreObj) => {
            const startOfDay = new Date(scoreObj.date + 'T00:00:00.000Z');
            const endOfDay = new Date(scoreObj.date + 'T23:59:59.999Z');
            
            const journals = await Journal.find({
                user: req.user._id,
                createdAt: { $gte: startOfDay, $lte: endOfDay }
            });
            
            const journalInsights = journals.map(j => j.remarks).filter(Boolean);
            
            return {
                ...scoreObj.toObject(),
                journalInsights
            };
        }));
        
        res.json(enrichedScores); 
    } catch (error) {
        res.status(500).json({ message: 'Error fetching heatmap data' });
    }
});

// @route   POST /api/dashboard/facescan
// @desc    Silent passive route to update the DailyScore from WebCam
router.post('/facescan', protect, async (req, res) => {
    const { dominantEmotion } = req.body;
    try {
        const today = new Date().toISOString().split('T')[0];
        let dailyScore = await DailyScore.findOne({ user: req.user._id, date: today });

        let scoreMod = 0;
        if (dominantEmotion === 'Happy') scoreMod = 1;
        if (dominantEmotion === 'Sad' || dominantEmotion === 'Angry') scoreMod = -1;

        // --- PATHWAY MAPPING LOGIC ---
        const mapToPathway = (emotion) => {
            const e = emotion.toLowerCase();
            if (["happy", "joy", "surprised"].includes(e)) return "Sunlit Path";
            if (["neutral", "calm"].includes(e)) return "Quiet Valley";
            if (["angry", "disgusted", "frustrated"].includes(e)) return "Storm Shelter";
            if (["sad"].includes(e)) return "Reflective Lake";
            if (["fearful", "anxious"].includes(e)) return "Safe Harbor";
            return "Quiet Valley";
        };

        const pathway = mapToPathway(dominantEmotion);

        if (!dailyScore) {
            dailyScore = await DailyScore.create({
                user: req.user._id, date: today, 
                score: Math.min(100, Math.max(0, 50 + scoreMod)),
                factors: { faceDetectionsCount: 1, journalCount: 0 },
                emotionTallies: {
                    "Sunlit Path": pathway === "Sunlit Path" ? 1 : 0,
                    "Quiet Valley": pathway === "Quiet Valley" ? 1 : 0,
                    "Storm Shelter": pathway === "Storm Shelter" ? 1 : 0,
                    "Reflective Lake": pathway === "Reflective Lake" ? 1 : 0,
                    "Safe Harbor": pathway === "Safe Harbor" ? 1 : 0
                }
            });
        } else {
            // Apply slight smoothing
            dailyScore.score = Math.min(100, Math.max(0, dailyScore.score + scoreMod));
            dailyScore.factors.faceDetectionsCount += 1;
            
            // Update Tally
            const currentTally = dailyScore.emotionTallies.get(pathway) || 0;
            dailyScore.emotionTallies.set(pathway, currentTally + 1);
            
            await dailyScore.save();
        }
        res.status(200).json({ success: true, newScore: dailyScore.score });
    } catch (error) {
        res.status(500).json({ message: 'Error syncing face data' });
    }
});

module.exports = router;
