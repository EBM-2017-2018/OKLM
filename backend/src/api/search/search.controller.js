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

const getContentTypes = (query) => {
  if (Array.isArray(query)) return query;
  else if (query) return query.split(',');

  return ['documents', 'categories'];
};

module.exports.search = async (req, res) => {
  const types = getContentTypes(req.query.type);

  const results = {};

  if (types.includes('categories')) {
    results.categories = await queryInCategory(req.query.q);
  }

  if (types.includes('documents')) {
    results.documents = await queryInDocument(req.query.q);
  }

  res.send(results);
};

