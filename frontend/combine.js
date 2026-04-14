import fs from 'fs';
const aboutCss = fs.readFileSync('src/pages/about/About.module.css', 'utf-8');
const homeCss = fs.readFileSync('src/pages/home/Home.module.css', 'utf-8');
// Extract the required sections from aboutCss (split by comment)
const relevantCss = aboutCss.substring(aboutCss.indexOf('/* About Fitness Section Styles */'));
fs.writeFileSync('src/pages/home/Home.module.css', homeCss + '\n' + relevantCss);
console.log('Appended About.module.css sections to Home.module.css');
