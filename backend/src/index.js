const express = require('express');
const config = require('./config');

const app = express();
const server = require('http').Server(app);

server.listen(config.app.port, (err) => {
	if (err) return console.error(err);
	console.log(`Listening on port ${config.app.port}`);
});
