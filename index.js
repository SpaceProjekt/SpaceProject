const apod = require('./functions/apod');
const constellations = require(`./functions/constellations`);
const fs = require('fs');
const input = require('./cache/input.json');
const launches = require('./functions/nextLaunches')

if (!fs.existsSync('./cache')) {
    fs.mkdirSync('./cache');
}

if (input.type === 'apod') {
    apod.execute(input.request || 'today');
} else if (input.type === 'const') {
    constellations.execute(input.request.toLowerCase() || 'gem');
} else if (input.type === 'launch') {
    launches.execute(input.request || 'nasa');
}