const fetch = require('node-fetch');
const HttpsProxyAgent = require('https-proxy-agent');
const url = require('url');

const CHECK_TOKEN_PATH = '/api/checkandrefreshtoken';

const User = require('./user.model');
const Document = require('../documents/document.model');

const config = require('../../../config/index');

module.exports = {};

const getUsers = () => User.find({});
const getUserById = userId => User.findOne({ _id: userId });
module.exports.getUserById = getUserById;

module.exports.getAll = (req, res) => {
  getUsers()
    .then(users => res.status(200)
      .json(users))
    .catch(err => res.status(500)
      .json(err));
};

module.exports.findOne = (req, res) => {
  getUserById(req.params.id)
    .then(async (user) => {
      if (!user) {
        res.status(404)
          .json({
            code: 'USER_NOT_FOUND',
            message: 'L\'utilisateur n\'a pas pu être trouvé',
          });
      } else {
        const authHeader = req.headers.authorization || '';
        const { provider } = config.auth;
        const response = await fetch(url.resolve(provider, CHECK_TOKEN_PATH), {
          headers: { Authorization: authHeader },
          agent: process.env.AUTH_PROXY ? new HttpsProxyAgent(process.env.AUTH_PROXY) : null,
        });
        res.status(200)
          .json(await response.json());
      }
    })
    .catch(err => res.status(500)
      .json(err));
};

module.exports.create = (req, res) => {
  const user = new User(req.body);
  user.save((err) => {
    if (err) {
      return res.status(500)
        .json(err);
    }
    return res.status(201)
      .json(user);
  });
};

module.exports.delete = (req, res) => {
  User.deleteOne(
    { _id: req.params.id },
    (err) => {
      if (err) {
        return res.status(500)
          .json(err);
      }
      return res.status(204)
        .end();
    },
  );
};

module.exports.fndDocumentsOfUser = (req, res) => {
  Document.find(
    { author: req.params.id },
    (err, docs) => {
      if (err) {
        return res.status(500)
          .json(err);
      }
      return res.status(200)
        .json(docs);
    },
  );
};

