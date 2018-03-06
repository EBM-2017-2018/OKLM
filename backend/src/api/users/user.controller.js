const User = require('./user.model');

module.exports = {};

module.exports.findAll = (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      return res.status(500)
        .json(err);
    }
    return res.status(200)
      .json(users);
  });
};

module.exports.findOne = (req, res) => {
  User.findOne(
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
