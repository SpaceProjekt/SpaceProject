const fetch = require('node-fetch');
const https = require('https');
const fs = require('fs');
const constList = require('../constellations.json');
const config = require('../config.json')

module.exports = {
    async execute(constellation) {
        if (!fs.existsSync('./cache/constellations')) {
            fs.mkdirSync('./cache/constellations')
        };
        let constNames = []
        for (let i = 0; i < constList.length; i++) {
            constNames.push(`${constList[i].abbr.toLocaleLowerCase()}`)
        }
        if (!constNames.includes(constellation)) {
            return console.log('Invalid input. No such constellation found.')
        }
        function handleResponse(response) {
            return response.json().then(function (json) {
                return response.ok ? json : Promise.reject(json);
            });
        }
        if (!fs.existsSync(`./cache/constellations/${constellation}.png`)) {            
            const hash = btoa(`${config.astroID}:${config.astroSecret}`)
            const parameters = {};
            parameters["constellation"] = constellation
            let data = JSON.stringify({
                style: "navy",
                observer: {
                    "latitude": 33.775867,
                    "longitude": -84.39733,
                    "date": "2022-10-10"
                },
                view: {
                    type: "constellation",
                    parameters,
                }
            });
            let options = {
                method: 'POST',
                headers: {
                    'Authorization': `Basic ${hash}`                
                },
                body: data      
            };
            await fetch('https://api.astronomyapi.com/api/v2/studio/star-chart', options).then(handleResponse).then(data => {
                const file = fs.createWriteStream(`./cache/constellations/${constellation}.png`);
                const request = https.get(`${data.data.imageUrl}`, function (response) {
                    response.pipe(file);
                    file.on("finish", () => {
                        file.close();
                    });
                });
                return console.log('Success!')
            }).catch(err => {return console.log('An error occurred.')})            
        } else if (fs.existsSync(`./cache/constellations/${constellation}.png`)) {
            return console.log('Success!')
        }
    }
}