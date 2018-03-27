const config = require('../../../config/index');
const fs = require('fs');
const url = require('url');
const path = require('path');
const Document = require('./document.model');

const { getCategoryById } = require('../categories/categories.controller');
const { getUserById } = require('../users/user.controller');

module.exports = {};

const addAuthorToDocument = (document, author) => {
  const doc = document.toObject();
  doc.author = author || doc.author;
  return doc;
};

const addAuthorsToListDocuments = async (documents) => {
  const authorsId = new Set(documents.map(doc => doc.author.toString()));
  const authorsDict = await Array.from(authorsId.values())
    .reduce(async (authorDict, authorId) => ({
      ...await authorDict,
      [authorId]: await getUserById(authorId),
    }), {});
  return documents.map(doc => addAuthorToDocument(doc, authorsDict[doc.author]));
};

const addCategoryToDocument = (document, category) => {
  const doc = document;
  doc.motherCategory = category || doc.motherCategory;
  return doc;
};

const addCategoriesToListDocuments = async (documents) => {
  const categoriesId = new Set(documents.map(doc => doc.motherCategory));
  const categoriesDict = await Array.from(categoriesId.values())
    .reduce(async (categoryDict, categeryId) => ({
      ...await categoryDict,
      [categeryId]: await getCategoryById(categeryId),
    }), {});
  return documents.map(doc => addCategoryToDocument(doc, categoriesDict[doc.motherCategory]));
};

module.exports.addCategoriesToListDocuments = addCategoriesToListDocuments;
module.exports.addAuthorsToListDocuments = addAuthorsToListDocuments;
module.exports.addAuthorToDocument = addAuthorToDocument;

const getAllDocuments = () => Document.find({})
  .then(docs => addAuthorsToListDocuments(docs))
  .then(docs => addCategoriesToListDocuments(docs));

module.exports.getDocumentById = documentId => Document.findOne({ _id: documentId })
  .then(async doc => addAuthorToDocument(doc, await getUserById(doc.author)))
  .then(async doc => addCategoryToDocument(doc, await getCategoryById(doc.motherCategory)));

module.exports.getAll = (req, res) => {
  getAllDocuments()
    .then(docs => res.status(200)
      .json(docs))
    .catch(err =>
      res.send(500)
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
  // pour le _id :
  // eslint-disable-next-line
  doc.author = req.user._id;
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
