'use strict';

const fs = require('fs');
var urlParse = require('url').parse;

let options = {
	host: 'localhost', port: 3000,
    key: fs.readFileSync(__dirname + '/server.key'),
    cert: fs.readFileSync(__dirname + '/server.crt')
};

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

require('http2').get(options, function(response) {
	console.log(response);
  	response.pipe(process.stdout);
});