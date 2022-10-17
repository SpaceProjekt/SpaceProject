const fetch = require('node-fetch');
const https = require('https');
const fs = require('fs');

module.exports = {
    async execute(input) {
        let responseData, date, dateNow, url;        
        if (!fs.existsSync('./cache/apod')) {
            fs.mkdirSync('./cache/apod')
        };
        function appendTxt(date, responseData) {
            fs.appendFileSync('./cache/apod/info.txt', `\n\n\n${date.toLocaleString({ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}\n${responseData.title}\n${responseData.explanation}\nLink to the high resolution image: ${responseData.hdurl}`, function (err) {
                if (err) return;
            });
        }

        function handleResponse(response) {
            return response.json().then(function (json) {
                return response.ok ? json : Promise.reject(json);
            });
        }

        if (input === 'today') {
            date = new Date();
            dateNow = date.toLocaleDateString().replace(/\//g, '-');
            url = `https://api.nasa.gov/planetary/apod?api_key=a6KdMt9R3inCtISa9hJnWIED14j7A2PcJN588dF0`
        } else if (input === 'random') {
            date = new Date(Math.floor(Math.random() * (1666032888*1000 - 803592000*1000)));
            dateNow = date.toLocaleDateString().replace(/\//g, '-');
            let a = dateNow.split('-')
            if (a[0].length === 1) a[0] = '0'+ a[0];
            [a[0], a[1]] = [a[1], a[0]]           
            dateNow = a.join("-");
            url = `https://api.nasa.gov/planetary/apod?date=${dateNow.split("-").reverse().join("-")}&api_key=a6KdMt9R3inCtISa9hJnWIED14j7A2PcJN588dF0`
        } else {
            date = new Date(parseInt(input));
            dateNow = date.toLocaleDateString().replace(/\//g, '-');
            let a = dateNow.split('-')
            if (a[0].length === 1) a[0] = '0' + a[0];
            [a[0], a[1]] = [a[1], a[0]]            
            dateNow = a.join("-");
            url = `https://api.nasa.gov/planetary/apod?date=${dateNow.split("-").reverse().join("-")}&api_key=a6KdMt9R3inCtISa9hJnWIED14j7A2PcJN588dF0`
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
                    if (!fs.readFileSync('./cache/apod/info.txt', 'utf-8').includes(`${dateNow.replace(/\-/g, '/')}`)) {
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
        } else if (!fs.readFileSync('./cache/apod/info.txt', 'utf-8').includes(`${dateNow.replace(/\-/g, '/')}`)) {
            if (fs.readFileSync('./cache/apod/info.txt', 'utf-8').length === 0) {
                fs.writeFileSync('./cache/apod/info.txt', 'Contains the information of the images stored.', function (err) {
                    if (err) return;
                })
            }
            await fetch(url).then(handleResponse).then(data => {                
                appendTxt(date, data);
            });
        }
    }
}