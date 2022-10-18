const fetch = require('node-fetch');
const https = require('https');
const fs = require('fs');
const constList = require('../constellations.json');

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
            let applicationId = '0dcbdb7a-dd68-46f9-a8be-22ddda3ed4ca'
            let applicationSecret = '481c26c9df9b00aa3d31d4f0878bf7bf38a5aa729425f726fdee4ec874b0bf80f3d838ae8dd1663809487cc0f12981ea1435b64ebf769148e1839d8ea1b1f63dfa86dab73e0c81d2c4903c904ac99f6b0452f93f7742c840eb26bc42b9d5c81c73e7f1c95bcabe3e3e0cb4667b957734'
            const hash = btoa(`${applicationId}:${applicationSecret}`)
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