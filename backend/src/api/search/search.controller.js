const Document = require('../resources/documents/document.model');
const Category = require('../resources/categories/category.model');

module.exports = {};
const searchInDocuments = fields => Document.find({
  $text: {
    $search: fields,
    $diacriticSensitive: true,
  },
});


const searchInCategories = fields => Category.find({
  $text: {
    $search: fields,
    $diacriticSensitive: true,
  },
});

module.exports.search = (req, res) => {
  let where;
  if (Array.isArray(req.query.content)) {
    where = req.query.content;
  } else {
    where = req.query.content.split(',');
  }
  const doQueryInDocuments = req.query.content ? where.includes('document') : true;
  const doQueryInCategories = req.query.content ? where.includes('category') : true;
  if (doQueryInCategories && doQueryInDocuments) {
    Promise.all([
      searchInCategories(req.query.q),
      searchInDocuments(req.query.q),
    ])
      .then(([cats, docs]) => ({
        categories: cats,
        documents: docs,
      }))
      .then(content => res.status(200)
        .json(content))
      .catch(err => res.status(500)
        .json(err));
  } else if (doQueryInCategories) {
    searchInCategories(req.query.q)
      .then((cat) => {
        res.status(200)
          .json(cat);
      })
      .catch(err => res.status(500)
        .json(err));
  } else if (doQueryInDocuments) {
    searchInDocuments(req.query.q)
      .then((docs) => {
        res.status(200)
          .json(docs);
      })
      .catch((err) => {
        res.status(500)
          .json(err);
      });
  }
};
