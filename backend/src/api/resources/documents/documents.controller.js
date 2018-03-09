const Document = require('./document.model');

const { getUserById } = require('../users/user.controller');

module.exports = {};

const addAuthorToDocument = async (document) => {
  const doc = document.toObject();
  doc.author = await getUserById(document.author);
  return doc;
};

// eslint-disable-next-line
const addAuthorsToListDocuments = async documents => {
  return Promise.all(documents.map(doc => addAuthorToDocument(doc)));
};

module.exports.addAuthorsToListDocuments = addAuthorsToListDocuments;
module.exports.addAuthorToDocument = addAuthorToDocument;

const getAllDocuments = () => Document.find({})
  .then(docs => addAuthorsToListDocuments(docs));

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
