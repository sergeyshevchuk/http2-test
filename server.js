'use strict'

const spdy = require('http2');
const fs = require('fs');

let options = {
    key: fs.readFileSync(__dirname + '/server.key'),
    cert: fs.readFileSync(__dirname + '/server.crt')
};

require('http2').createServer(options, function(req, res) {
    res.writeHead(200);
    console.log(req);
    res.end('Hello world over HTTP/2');
}).listen(3000);
