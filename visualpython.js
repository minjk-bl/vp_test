/** back up - working well */
// var http = require('http');
// var fs = require('fs');
// const path = require("path");

// var app = http.createServer(function(req, res){
// 	var url = req.url;
	
// 	if(url == '/'){
// 		url = '/index.html';
// 	}
// 	if(url == '/favicon.ico'){
// 		res.writeHead(404);
// 		res.end();
// 		return;
// 	}
// 	res.writeHead(200);
// 	res.end(fs.readFileSync(__dirname + url));
// });
// app.listen(3000);

/** test 1 */
// const http = require('http');
// const fs = require('fs');
// const path = require("path");
// const static = require('serve-static');

// // server name and port setting
// const hostname = '127.0.0.1';
// const port = 3000;
// // allowed extensions
// const mimeType = {
// 	".ico": "image/x-icon",
// 	// ".html": "text/html",
// 	// ".js": "text/javascript",
// 	// ".css": "text/css",
// 	".png": "image/png",
// 	".jpg": "image/jpeg",
// 	".eot": "aplication/vnd.ms-fontobject",
// 	".ttf": "aplication/font-sfnt",
// }

// // create server
// const app = http.createServer((req, res) => {
// 	var url = req.url;
// 	const ext = path.parse(url).ext
// 	console.log(__dirname, ' + ', url);
	
// 	if (url == '/'){
// 		url = '/index.html';
// 	}
// 	if (url == '/favicon.ico'){
// 		res.writeHead(404);
// 		res.end();
// 		return;
// 	}
// 	res.writeHead(200);
// 	// check allowed extensions
// 	if (Object.keys(mimeType).includes(ext)) {
// 		res.setHeader('Content-Type', mimeType[ext]);
// 	}
// 	// set respond data
// 	res.end(fs.readFileSync(__dirname + url));
// });
// // listen for request
// app.listen(port, hostname, () => {
// 	console.log(`Server running at http://${hostname}:${port}/`);
// });

/** test 2 - express
 * npm install express
 */	
const express = require('express');
const app = express();
const static = require('serve-static');
const path = require('path');

// server name and port setting
const hostname = '127.0.0.1';
const port = 3000;

// create static folder with its root folder
app.use(static(__dirname));

app.get('/', (req, res, next) => {
	res.sendFile(__dirname + '/index.html');
});

app.get('/favicon.ico', (req, res, next) => {
	res.writeHead(404);
	res.end();
});

app.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});
