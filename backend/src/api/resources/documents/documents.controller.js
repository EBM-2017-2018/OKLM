const Document = require('./document.model');

module.exports = {};

const getAllDocuments = () => Document.find({});

module.exports.getDocumentById = documentId => Document.find({ _id: documentId });

module.exports.findAll = (req, res) => {
  getAllDocuments()
    .then(docs => res.status(200)
      .json(docs))
    .catch(err => res.send(500)
      .json(err));
};

module.exports.findOne = (req, res) => {
  module.exports.getDocumentById(req.params.id)
    .then((doc) => {
      if (!doc) {
        return res.status(404)
          .json({
            code: 'DOCUMENT_NOT_FOUND',
            message: 'Le document n\'a pas pu être trouvé',
          });
      }
      return res.status(200)
        .json(doc);
    })
    .catch(err => res.status(500)
      .json(err));
};

module.exports.create = (req, res) => {
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
