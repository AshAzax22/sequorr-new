import { pipeline, env } from '@huggingface/transformers';

// Tell the official Hugging Face library to look in our project's 'public/' folder.
env.allowLocalModels = true; 
env.allowRemoteModels = false; 
env.localModelPath = '/'; 

let classifier = null;

// Initialize the NLP pipeline using our local 'Brain' folder.
export const initTextEngine = async () => {
    if (!classifier) {
        // Point to our local directory: models/emotion
        // With localModelPath = '/', it will fetch '/models/emotion/config.json'
        classifier = await pipeline('text-classification', 'models/emotion');
    }
    return classifier;
}

export const analyzeTextEmotion = async (text) => {
    if (!classifier) {
        await initTextEngine();
    }
    
    // Skip if empty
    if (!text || text.trim() === '') return { emotionScores: {}, remarks: "No entry" };

    // Get the top 3 emotions to build the score vector
    const output = await classifier(text, { topk: 3 });
    
    let scores = {};
    output.forEach(item => {
        scores[item.label] = item.score;
    });

    // Auto-generate a high-level remark to be displayed on the Analytics Dashboard Heatmap
    let remark = "General Reflection";
    if (scores['sadness'] > 0.4) remark = "Sorrow/Sadness detected in journal.";
    if (scores['fear'] > 0.4) remark = "Anxiety/Fear triggered.";
    if (scores['joy'] > 0.4) remark = "Positive joyful reflection.";
    if (scores['anger'] > 0.4) remark = "Frustration/Anger noted.";

    return { emotionScores: scores, remarks: remark };
}
