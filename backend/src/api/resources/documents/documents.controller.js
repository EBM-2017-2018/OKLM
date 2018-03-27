const config = require('../../../config/index');
const fs = require('fs');
const url = require('url');
const path = require('path');
const Document = require('./document.model');

const { getUserById } = require('../users/user.controller');

module.exports = {};

const addAuthorToDocument = (document, author) => {
  const doc = document.toObject();
  doc.author = author;
  return doc;
};

const addAuthorsToListDocuments = (documents) => {
  const authorsId = new Set(documents.map(doc => doc.author.toString()));
  const authorsDict = Array.from(authorsId.values())
    .reduce(async (authorDict, authorId) => ({
      ...authorDict,
      [authorId]: getUserById(authorId),
    }), {});
  return documents.map(doc => addAuthorToDocument(doc, authorsDict[doc.author]));
};

module.exports.addAuthorsToListDocuments = addAuthorsToListDocuments;
module.exports.addAuthorToDocument = addAuthorToDocument;

const getAllDocuments = () => Document.find({})
  .then(docs => addAuthorsToListDocuments(docs));

module.exports.getDocumentById = documentId => Document.findOne({ _id: documentId });

module.exports.getAll = (req, res) => {
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
  const { file } = req;
  doc.author = req.user.username;
  if (file) {
    // eslint-disable-next-line
    doc.uri = url.resolve('/api/download/', doc._id.toString());
    doc.fileName = file.originalname;
    doc.localFileName = file.filename;
    doc.isLocalFile = true;
  }
  doc.save((err) => {
    if (err) {
      try {
        fs.unlink(path.join(config.filesystem.uploadPath, doc.localFileName));
      } catch (error) {
        console.log(error);
      }
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
