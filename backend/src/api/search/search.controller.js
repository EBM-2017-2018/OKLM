const Document = require('../resources/documents/document.model');
const Category = require('../resources/categories/category.model');

const { addAuthorsToListDocuments } = require('../resources/documents/documents.controller');
const { textSearch, score } = require('./search.config');

module.exports = {};

const queryInDocument = fields => Document.find(textSearch(fields), score)
  .sort(score)
  .then(docs => addAuthorsToListDocuments(docs));

const queryInCategory = fields => Category.find(textSearch(fields), score)
  .sort(score);

const searchInDocument = (res, fields) => {
  queryInDocument(fields)
    .then(documents => res.status(200)
      .json({ documents }))
    .catch(err => res.status(500)
      .json(err));
};

const searchInCategory = (res, fields) => {
  queryInCategory(fields)
    .then(categories => res.status(200)
      .json({ categories }))
    .catch(err => res.status(500)
      .json(err));
};

const searchInBoth = (res, fields) => {
  Promise.all([
    queryInCategory(fields),
    queryInDocument(fields),
  ])
    .then(([cats, docs]) => ({
      categories: cats,
      documents: docs,
    }))
    .then(content => res.status(200)
      .json(content))
    .catch(err => res.status(500)
      .json(err));
};

module.exports.search = (req, res) => {
  let where;
  if (Array.isArray(req.query.content)) {
    where = req.query.content;
  } else if (req.query.content) {
    where = req.query.content.split(',');
  }
  const doQueryInDocuments = req.query.content ? where.includes('documents') : true;
  const doQueryInCategories = req.query.content ? where.includes('categories') : true;
  if (doQueryInCategories && doQueryInDocuments) {
    searchInBoth(res, req.query.q);
  } else if (doQueryInCategories) {
    searchInCategory(res, req.query.q);
  } else if (doQueryInDocuments) {
    searchInDocument(res, req.query.q);
  } else {
    searchInBoth(res, req.query.q);
  }
};

