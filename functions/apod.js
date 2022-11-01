const fetch = require('node-fetch');
const https = require('https');
const fs = require('fs');

module.exports = {
    async execute(input) {
        let path = __dirname.split(/\\/gm)
        path.pop()
        path = path.join('/')
        const config = require(`${path}/config.json`)
        let responseData, date, dateNow, url;
        if (!fs.existsSync(`${path}/cache/apod`)) {
            fs.mkdirSync(`${path}/cache/apod`);
        };
        function appendTxt(date, responseData) {
            let tempDate = date.toISOString().split('T')[0]
            tempDate = tempDate.split('-').reverse().join('/')
            fs.appendFileSync(`${path}/cache/apod/info.txt`, `\n\n\n${tempDate}\n${responseData.title}\n${responseData.explanation}\nLink to the high resolution image: ${responseData.hdurl || "Not found"}`, function (err) {
                if (err) return;
            });
        }

        function handleResponse(response) {
            return response.json().then(function (json) {
                return response.ok ? json : Promise.reject(json);
            });
        }

        if (input === 'today') {
            let dateHere = new Date();
            let utc = dateHere.getTime() + (dateHere.getTimezoneOffset() * 60000);
            date = new Date(utc + (3600000 * -5));
            dateNow = date.toISOString().split('T')[0].split('-').reverse().join('-');
            url = `https://api.nasa.gov/planetary/apod?api_key=${config.nasa}`
        } else if (input === 'random') {
            let dateHere = new Date(Math.floor(Math.random() * (Date.now() - 803592000 * 1000)) + 803592000 * 1000);
            let utc = dateHere.getTime() + (dateHere.getTimezoneOffset() * 60000);
            date = new Date(utc + (3600000 * -5));
            if (date < 803592000 * 1000) date = new Date(803592000 * 1000);
            dateNow = date.toISOString().split('T')[0].split('-').reverse().join('-');
            url = `https://api.nasa.gov/planetary/apod?date=${date.toISOString().split('T')[0]}&api_key=${config.nasa}`
        } else {
            if (parseInt(input) > Date.now() || parseInt(input) < 803592000 * 1000) {
                return console.log('Invalid input.')
            }
            let dateHere = new Date(parseInt(input));
            date = dateHere
            dateNow = date.toISOString().split('T')[0].split('-').reverse().join('-');
            url = `https://api.nasa.gov/planetary/apod?date=${date.toISOString().split('T')[0]}&api_key=${config.nasa}`
        }

        if (!fs.existsSync(`${path}/cache/apod/${dateNow}.png`)) {
            await fetch(url).then(handleResponse).catch((err) => console.log(err))
            .then(data => {
                responseData = data
                if (data.media_type === 'video') {
                    return console.log(`Cannot display video.\n${data.url}`)
                }
                if (!fs.existsSync(`${path}/cache/apod/info.txt`) || (fs.existsSync(`${path}/cache/apod/info.txt`) && fs.readFileSync(`${path}/cache/apod/info.txt`, 'utf-8').length === 0)) {
                    fs.writeFileSync(`${path}/cache/apod/info.txt`, 'Contains the information of the images stored.', function (err) {
                        if (err) return;
                    })
                    appendTxt(date, responseData);
                } else if (fs.existsSync(`${path}/cache/apod/info.txt`)) {
                    if (!fs.readFileSync(`${path}/cache/apod/info.txt`, 'utf-8').includes(`${date.toISOString().split('T')[0].split('-').reverse().join('-')}`)) {
                        appendTxt(date, responseData);
                    }
                }
            });
            if (responseData.media_type != 'video') {
                const file = fs.createWriteStream(`${path}/cache/apod/${dateNow}.png`);
                const request = https.get(`${responseData.url}`, function (response) {
                    response.pipe(file);
                    file.on("finish", () => {
                        file.close();
                    });
                });
                return console.log(`Success!\n${dateNow}`);
            }
        } else if (!fs.readFileSync(`${path}/cache/apod/info.txt`, 'utf-8').includes(`${date.toISOString().split('T')[0].split('-').reverse().join('-')}`)) {
            if (fs.readFileSync(`${path}/cache/apod/info.txt`, 'utf-8').length === 0) {
                fs.writeFileSync(`${path}/cache/apod/info.txt`, 'Contains the information of the images stored.', function (err) {
                    if (err) return;
                })
            }
            await fetch(url).then(handleResponse).then(data => {
                appendTxt(date, data);
            });
            return console.log(`Success!\n${dateNow}`)
        } else if (fs.existsSync(`${path}/cache/apod/${dateNow}.png`) && fs.readFileSync(`${path}/cache/apod/info.txt`, 'utf-8').includes(`${date.toISOString().split('T')[0].split('-').reverse().join('-')}`)) {
            return console.log(`Success!\n${dateNow}`)
        }
    }
}