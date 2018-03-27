const path = require('path');

const express = require('express');
const serveStatic = require('serve-static');
const config = require('./config');

const app = express();
const server = require('http').Server(app);

const User = require('./api/resources/users/user.model');

require('./config/mongoose');

app.use(require('body-parser').json());

app.use(require('ebm-auth').initialize({
  provider: config.auth.provider,
  userFactory: userData => User.findOne({ linkappId: userData.username })
    .then((user) => {
      if (!user) {
        return User.create({
          name: `${userData.prenom} ${userData.nom}`,
          linkappId: userData.username,
        });
      }
      return user;
    })
    .then(user => Object.assign({}, userData, user.toObject())),
}));

app.use('/api', require('./api'));

app.use(serveStatic('./public'));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

server.listen(config.app.port, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Listening on port ${config.app.port}`);
  }
});
