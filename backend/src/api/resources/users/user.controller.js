const User = require('./user.model');
const Document = require('../documents/document.model');

module.exports = {};

const getUsers = () => User.find({});
module.exports.getUserById = userId => User.findOne({ _id: userId });

module.exports.findAll = (req, res) => {
  getUsers()
    .then(users => res.status(200)
      .json(users))
    .catch(err => res.status(500)
      .json(err));
};

module.exports.findOne = (req, res) => {
  module.exports.getUserById(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(404)
          .json({
            code: 'USER_NOT_FOUND',
            message: 'L\'utilisateur n\' pas pu être trouvé',
          });
      } else {
        res.status(200)
          .json(user);
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

