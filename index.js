const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Directory containing your images
const inputDir = './inputImages';
const outputDir = './outputImages';

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

// Background color
const backgroundColor = { r: 241, g: 238, b: 233, alpha: 1 };

// Read all files from the input directory
fs.readdir(inputDir, (err, files) => {
    if (err) {
        console.error('Error reading input directory:', err);
        return;
    }

    files.forEach(file => {
        const inputFilePath = path.join(inputDir, file);
        const outputFilePath = path.join(outputDir, file);

        sharp(inputFilePath)
            .flatten({ background: backgroundColor }) // Add background color
            .toFile(outputFilePath, (err, info) => {
                if (err) {
                    console.error('Error processing file:', file, err);
                } else {
                    console.log('Processed file:', file, info);
                }
            });
    });
});
