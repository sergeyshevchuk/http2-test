'use strict'

const spdy = require('spdy');
const fs = require('fs');
const path = require('path');

const afterLastSlash = /[^\/]*$/;

let options = {
    key: fs.readFileSync(__dirname + '/server.key'),
    cert: fs.readFileSync(__dirname + '/server.crt')
};

spdy.createServer(options, function(req, res) {
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
    	res.end('Hello world over HTTP/2');	
    }  
}).listen(3000);
