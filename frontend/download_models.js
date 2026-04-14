import fs from 'fs';
import https from 'https';
import path from 'path';

const modelsToDownload = [
    'tiny_face_detector_model-weights_manifest.json',
    'tiny_face_detector_model-shard1',
    'face_expression_model-weights_manifest.json',
    'face_expression_model-shard1'
];

const baseUrl = 'https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights/';
const dir = path.join(process.cwd(), 'public', 'models');

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

modelsToDownload.forEach(file => {
    const fileStream = fs.createWriteStream(path.join(dir, file));
    https.get(baseUrl + file, function(response) {
        response.pipe(fileStream);
        fileStream.on('finish', () => {
            fileStream.close();
            console.log(`Downloaded ${file}`);
        });
    }).on('error', function(err) {
        fs.unlink(path.join(dir, file));
        console.error(`Error downloading ${file}: `, err.message);
    });
});
