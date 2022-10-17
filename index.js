const apod = require('./functions/apod');
const fs = require('fs');
const input = require('./cache/input.json')

if (!fs.existsSync('./cache')) {
    fs.mkdirSync('./cache')
}

if (input.type === 'apod') {
    apod.execute(input.request || 'today');
}