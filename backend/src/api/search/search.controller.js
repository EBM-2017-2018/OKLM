const Document = require('../resources/documents/document.model');
const Category = require('../resources/categories/category.model');

const { addAuthorsToListDocuments, addCategoriesToListDocuments } = require('../resources/documents/documents.controller');
const { textSearch, score } = require('./search.config');

module.exports = {};

const getSortType = (sortType) => {
  const sort = sortType.reduce((prev, curr) => {
    const p = Object.assign({}, prev);
    if (curr === 'rank') {
      p.score = { $meta: 'textScore' };
    } else if (curr === 'date_asc') {
      p.creationTime = 1;
    } else if (curr === 'date_desc') {
      p.creationTime = -1;
    }
    return p;
  }, {});
  sort.creationTime = sort.creationTime || -1;
  return sort;
};

const queryInDocument = (fields, sortType) => {
  const sortBy = getSortType(sortType.split(','));
  return Document.find(textSearch(fields), score)
    .sort(sortBy)
    .then(docs => addAuthorsToListDocuments(docs))
    .then(docs => addCategoriesToListDocuments(docs));
};

const queryInCategory = fields => Category.find(textSearch(fields), score)
  .sort(score);

const getContentTypes = (query) => {
  if (Array.isArray(query)) {
    return query;
  } else if (query) return query.split(',');

  return ['documents', 'categories'];
};

module.exports.search = async (req, res) => {
  const types = getContentTypes(req.query.type);

  const sorted = req.query.sort;
  const results = {};

  if (types.includes('categories')) {
    results.categories = await queryInCategory(req.query.q);
  }

  if (types.includes('documents')) {
    results.documents = await queryInDocument(req.query.q, sorted);
  }

  res.send(results);
};

