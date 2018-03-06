const Document = require('./document.model');

module.exports = {};

module.exports.findAll = (req, res) => {
  Document.find({}, (err, docs) => {
    if (err) {
      return res.status(500)
        .json(err);
    }
    return res.status(200)
      .json(docs);
  });
};

module.exports.findOne = (req, res) => {
  Document.findOne(
    { _id: req.params.id },
    (err, doc) => {
      if (err) {
        return res.status(500)
          .json(err);
      }
      if (!doc) {
        return res.status(404)
          .json({
            code: 'DOCUMENT_NOT_FOUND',
            message: 'Le document n\'a pas pu être trouvé',
          });
      }
      return res.status(200)
        .json(doc);
    },
  );
};

module.exports.create = (req, res) => {
  req.body.creationTime = new Date();
  const doc = new Document(req.body);
  doc.save((err) => {
    if (err) {
      return res.status(500)
        .json(err);
    }
    return res.status(201)
      .json(doc);
  });
};

module.exports.delete = (req, res) => {
  Document.deleteOne(
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
