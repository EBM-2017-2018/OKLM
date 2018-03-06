const Document = require('./document.model');

module.exports = {};

module.exports.findAll = (req, res) => {
  Document.find({}, (err, docs) => {
    if (err) {
      return res.status(500)
        .json(err);
    }
    return res.status(200)
      .json(docs);
  });
};

module.exports.create = (req, res) => {
  req.body.creationTime = new Date();
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
