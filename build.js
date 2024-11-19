const fs = require('fs');
const path = require('path');

const romsDir = path.join(__dirname, 'roms');

function capitalizeWords(str) {
    return str.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

function exploreRoms(dir) {
    const categories = {};

    fs.readdirSync(dir).forEach(folder => {
        const folderPath = path.join(dir, folder);
        if (fs.lstatSync(folderPath).isDirectory()) {
            categories[folder] = [];
            fs.readdirSync(folderPath).forEach(file => {
                const fileName = path.basename(file);
                const displayName = capitalizeWords(fileName.replace(/\.[^/.]+$/, ''));
                categories[folder].push([fileName, displayName]);
            });
        }
    });

    return categories;
}

const roms = exploreRoms(romsDir);
console.log(JSON.stringify(roms, null, 4));