const Tag = require('./tag.model');

module.exports = {};

const getAll = () => Tag.find({});
const getTagById = id => Tag.findOne({ _id: id });

module.exports.getAll = (req, res) => {
  getAll()
    .then(tags => res.status(200)
      .json(tags))
    .catch(err => res.status(500)
      .json(err));
};

module.exports.create = (req, res) => {
  const tag = new Tag(req.body);
  tag.save((err) => {
    if (err) {
      return res.status(500)
        .json(err);
    }
    return res.status(201)
      .json(tag);
  });
};

module.exports.getOne = (req, res) => {
  getTagById(req.params.id)
    .then((tag) => {
      if (!tag) {
        return res.status(404)
          .json({
            code: 'TAG_NOT_FOUND',
            message: 'L\'utilisateur n\'a pas pu être trouvé',
          });
      }
      return res.status(200)
        .json(tag);
    });
};

module.exports.delete = (req, res) => {
  Tag.deleteOne(
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
