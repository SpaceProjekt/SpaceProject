const fetch = require('node-fetch');
const https = require('https');
const fs = require('fs');
const config = require('../config.json')

module.exports = {
    async execute(input) {
        let responseData, date, dateNow, url;        
        if (!fs.existsSync('./cache/apod')) {
            fs.mkdirSync('./cache/apod');
        };
        function appendTxt(date, responseData) {            
            fs.appendFileSync('./cache/apod/info.txt', `\n\n\n${date.toLocaleString({ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}\n${responseData.title}\n${responseData.explanation}\nLink to the high resolution image: ${responseData.hdurl || "Not found"}`, function (err) {
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
            dateNow = date.toLocaleDateString().replace(/\//g, '-');
            let a = dateNow.split('-')
            if (a[0].length === 1) a[0] = '0'+ a[0];
            if (a[1].length === 1) a[1] = '0' + a[1];
            temp = a[0]
            temp1 = a[1]
            temp2 = a[2]
            a = [temp1, temp, temp2]
            dateNow = a.join("-");           
            url = `https://api.nasa.gov/planetary/apod?api_key=${config.nasa}`
        } else if (input === 'random') {
            let dateHere = new Date(Math.floor(Math.random() * (Date.now() - 803592000 * 1000)) + 803592000 * 1000);
            let utc = dateHere.getTime() + (dateHere.getTimezoneOffset() * 60000);
            date = new Date(utc + (3600000 * -5));            
            if (date < 803592000 * 1000) date = new Date(803592000 * 1000);
            dateNow = date.toLocaleDateString().replace(/\//g, '-');            
            let a = dateNow.split('-')
            if (a[0].length === 1) a[0] = '0'+ a[0];
            if (a[1].length === 1) a[1] = '0' + a[1];
            temp = a[0]
            temp1 = a[1]
            temp2 = a[2]
            a = [temp1, temp, temp2]
            dateNow = a.join("-");            
            url = `https://api.nasa.gov/planetary/apod?date=${dateNow.split("-").reverse().join("-")}&api_key=${config.nasa}`
        } else {
            if (parseInt(input) > Date.now() || parseInt(input) < 803592000 * 1000) {
                return console.log('Invalid input.')
            }
            let dateHere = new Date(parseInt(input));      
            date = dateHere
            let dateThere = new Date(dateHere.getTime() + (dateHere.getTimezoneOffset() * 60000) + (3600000 * -5))
            if (dateHere > dateThere){
                date = dateThere
            }            
            dateNow = date.toLocaleDateString().replace(/\//g, '-')
            let a = dateNow.split('-')
            if (a[0].length === 1) a[0] = '0' + a[0];     
            if (a[1].length === 1) a[1] = '0' + a[1];
            temp = a[0]
            temp1 = a[1]
            temp2 = a[2]
            a = [temp1, temp, temp2]
            dateNow = a.join("-");            
            url = `https://api.nasa.gov/planetary/apod?date=${dateNow.split("-").reverse().join("-")}&api_key=${config.nasa}`
        }

        if (!fs.existsSync(`./cache/apod/${dateNow}.png`)) {               
            await fetch(url).then(handleResponse).catch((err) => console.log(err))
            .then(data => {
                responseData = data
                if (!fs.existsSync(`./cache/apod/info.txt`) || (fs.existsSync(`./cache/apod/info.txt`) && fs.readFileSync('./cache/apod/info.txt', 'utf-8').length === 0)) {
                    fs.writeFileSync('./cache/apod/info.txt', 'Contains the information of the images stored.', function (err) {
                        if (err) return;
                    })
                    appendTxt(date, responseData);
                } else if (fs.existsSync(`./cache/apod/info.txt`)) {
                    if (!fs.readFileSync('./cache/apod/info.txt', 'utf-8').includes(`${date.toLocaleDateString()}`)) {
                        appendTxt(date, responseData);
                    }
                }                
            });
            const file = fs.createWriteStream(`./cache/apod/${dateNow}.png`);            
            const request = https.get(`${responseData.url}`, function (response) {
                response.pipe(file);
                file.on("finish", () => {
                    file.close();
                });
            });
            return console.log(`Success!\n${dateNow.split('-').reverse().join('-')}`);
        } else if (!fs.readFileSync('./cache/apod/info.txt', 'utf-8').includes(`${date.toLocaleDateString()}`)) {
            if (fs.readFileSync('./cache/apod/info.txt', 'utf-8').length === 0) {
                fs.writeFileSync('./cache/apod/info.txt', 'Contains the information of the images stored.', function (err) {
                    if (err) return;
                })
            }
            await fetch(url).then(handleResponse).then(data => {                
                appendTxt(date, data);
            });
            return console.log(`Success!\n${dateNow.split('-').reverse().join('-')}`)
        } else if (fs.existsSync(`./cache/apod/${dateNow}.png`) && fs.readFileSync('./cache/apod/info.txt', 'utf-8').includes(`${date.toLocaleDateString()}`)) {
            return console.log(`Success!\n${dateNow.split('-').reverse().join('-')}`)
        }        
    }
}