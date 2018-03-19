const Document = require('../resources/documents/document.model');
const Category = require('../resources/categories/category.model');

const { addAuthorsToListDocuments } = require('../resources/documents/documents.controller');
const { textSearch, sort, score } = require('./search.config');

module.exports = {};

const getSortType = (sortType) => {
  if (sortType === 'date_desc') {
    return [sort.date_desc];
  } else if (sortType === 'date_asc') {
    return [sort.date_asc];
  } else if (sortType === 'rank') {
    return [sort.rank];
  }
  return [[]];
  // console.log(sortType);
  // const sortBy = sortType.split(',');
  // return sortBy.reduce((prev, curr) => {
  //   if (curr === 'date_desc') {
  //     prev.push(['creationTime', -1]);
  //   } else if (curr === 'rank') {
  //     prev.push(['$score', -1]);
  //   }
  //   return prev;
  // }, []);
};

const queryInDocument = (fields, sortType) => {
  const sortBy = getSortType(sortType);
  return Document.find(textSearch(fields), score)
    .sort(sortBy)
    .then(docs => addAuthorsToListDocuments(docs));
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

