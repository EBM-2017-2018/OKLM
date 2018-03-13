const Tag = require('./tag.model');

module.exports = {};

module.exports.getAll = (req, res) => {
  Tag.find({}, (err, tags) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.json(tags);
  });
};

module.exports.create = (req, res) => {
  const tag = new Tag(req.body);
  tag.save((err) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(201).json(tag);
  });
};

module.exports.getOne = (req, res) => {
  Tag.findOne(
    { _id: req.params.id },
    (err, tag) => {
      if (err) {
        return res.status(500).json(err);
      }
      if (!tag) {
        return res.status(404).json({
          code: 'TAG_NOT_FOUND',
          message: 'L\'utilisateur n\'a pas pu être trouvé',
        });
      }
      return res.status(200).json(tag);
    },
  );
};

module.exports.delete = (req, res) => {
  Tag.deleteOne(
    { _id: req.params.id },
    (err) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(204).end();
    },
  );
};
