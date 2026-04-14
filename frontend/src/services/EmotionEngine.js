import { Human } from '@vladmandic/human';

const humanConfig = {
  // Use cloud CDN to fetch models securely and quickly without bloating the repo
  modelBasePath: 'https://cdn.jsdelivr.net/npm/@vladmandic/human/models',
  debug: false,
  face: {
    enabled: true,
    detector: { return: true, rotation: true },
    mesh: { enabled: true },
    iris: { enabled: false },
    emotion: { enabled: true }
  },
  body: { enabled: false },
  hand: { enabled: false },
  object: { enabled: false },
  gesture: { enabled: false }
};

let human = null;

export const initEmotionEngine = async () => {
    if (!human) {
        human = new Human(humanConfig);
        await human.load();
    }
    return human;
}

export const analyzeFace = async (videoElement) => {
    if (!human) {
        throw new Error("Emotion engine not initialized. Call initEmotionEngine first.");
    }
    return await human.detect(videoElement);
}

// Utility to parse out the dominant emotion
export const getDominantEmotion = (face) => {
    if (!face || !face.emotion || face.emotion.length === 0) {
        return { emotion: 'Neutral', score: 0 };
    }
    
    // face.emotion is an array: [ { score: 0.9, emotion: 'happy' }, ... ]
    let max = face.emotion[0];
    for (const e of face.emotion) {
        if (e.score > max.score) {
            max = e;
        }
    }
    
    return {
        emotion: max.emotion.charAt(0).toUpperCase() + max.emotion.slice(1),
        score: max.score
    };
}

// Utility to easily draw results onto a canvas
export const drawResults = (canvasElement, videoElement, result) => {
    if (!human || !canvasElement || !videoElement) return;
    
    // Automatically matches canvas size to video size
    canvasElement.width = videoElement.videoWidth;
    canvasElement.height = videoElement.videoHeight;
    
    // Configure human to flip drawn elements (mirrors bounding boxes but keeps text readable)
    if (human.drawOptions) {
        human.drawOptions.flip = true;
    }
    
    // Use human's built-in drawing utils
    human.draw.all(canvasElement, result);
}
