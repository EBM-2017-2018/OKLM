const User = require('./user.model');
const Document = require('../documents/document.model');

module.exports = {};

module.exports.getAll = (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      return res.status(500)
        .json(err);
    }
    return res.status(200)
      .json(users);
  });
};

module.exports.getOne = (req, res) => {
  User.getOne(
    { _id: req.params.id },
    (err, user) => {
      if (err) {
        return res.status(500)
          .json(err);
      }
      if (!user) {
        return res.status(404)
          .json({
            code: 'USER_NOT_FOUND',
            message: 'L\'utilisateur n\' pas pu être trouvé',
          });
      }
      return res.status(200)
        .json(user);
    },
  );
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
