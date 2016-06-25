'use strict'

const fs = require('fs');
const path = require('path');

let protocolName;

function initHttp1() {
    protocolName = 'HTTPS/1';
    return require('https');       
}

function initHttp2() {
    protocolName = 'HTTP/2';
    return require('spdy');       
}

const PROTOCOL = process.argv[2] === 'https' ? initHttp1() : initHttp2()

const afterLastSlash = /[^\/]*$/;

let options = {
    key: fs.readFileSync(__dirname + '/server.key'),
    cert: fs.readFileSync(__dirname + '/server.crt')
};

const PORT = 3000;

PROTOCOL.createServer(options, function(req, res) {
	if (req.url === '/it') {
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.createReadStream('it.html').pipe(res);
    } else if(req.url.includes('images')){
    	res.writeHead(200);
    	const imageId = req.url.match(afterLastSlash)[0];
    	const imagePath = path.resolve('./images', imageId)
    	fs.createReadStream(imagePath).pipe(res);			
    } else {
    	res.writeHead(200);
    	res.end(`Hello world over ${protocolName}`);	
    }  
}).listen(PORT);

console.log(`Server port: ${PORT} and ${protocolName}`);
