const path = require('path')

const express = require('express');
const config = require('./config');

const app = express();
const server = require('http').Server(app);

app.use('/api', require('./api'));
app.get('/*', (req, res) => {
  res.status(404);
  res.sendFile(path.join(__dirname, 'views', '404.html'))
});

server.listen(config.app.port, (err) => {
  if (err) {
    return console.error(err);
  }
  console.log(`Listening on port ${config.app.port}`);
});
