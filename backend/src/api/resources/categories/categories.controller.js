const Category = require('./category.model');
const Document = require('../documents/document.model');

module.exports = {};

module.exports.findTopLevelCategories = (req, res) => {
  Category.find({
    motherCategory: null,
  }, (err, categories) => {
    if (err) {
      return res.status(500)
        .json(err);
    }
    return res.status(200)
      .json(categories);
  });
};

const getCategoryContent = categoryId => (
  Promise.all([
    Category.find({
      motherCategory: categoryId,
    }),
    Document.find({
      motherCategory: categoryId,
    }),
  ])
    .then(([cats, docs]) => ({
      categories: cats,
      documents: docs,
    }))
);

module.exports.getOne = (req, res) => {
  Category.getOne(
    { _id: req.params.id },
    // eslint-disable-next-line
    (err, category) => {
      if (err) {
        return res.status(500)
          .json(err);
      }
      if (!category) {
        return res.status(404)
          .json({
            code: 'CATEGORY_NOT_FOUND',
            message: 'La catégorie n\'a pas pu être trouvée',
          });
      }
      if (req.query.content === 'all') {
        getCategoryContent(req.params.id)
          .then((content) => {
            res.status(200)
              .json(Object.assign(category.toObject(), { content }));
          })
          .catch((error) => {
            res.status(500)
              .json(error);
          });
      } else {
        return res.status(200)
          .json(category);
      }
    },
  );
};

module.exports.create = (req, res) => {
  const category = new Category(req.body);
  category.save((err) => {
    if (err) {
      return res.status(500)
        .json(err);
    }
    return res.status(201)
      .json(category);
  });
};

module.exports.delete = (req, res) => {
  Category.deleteOne(
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
