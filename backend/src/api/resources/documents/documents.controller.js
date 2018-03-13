const fs = require('fs');
const url = require('url');
const Document = require('./document.model');

module.exports = {};

module.exports.getAll = (req, res) => {
  Document.find({}, (err, docs) => {
    if (err) {
      return res.status(500)
        .json(err);
    }
    return res.status(200)
      .json(docs);
  });
};

module.exports.findOne = (req, res) => {
  Document.findOne(
    { _id: req.params.id },
    (err, doc) => {
      if (err) {
        return res.status(500)
          .json(err);
      }
      if (!doc) {
        return res.status(404)
          .json({
            code: 'DOCUMENT_NOT_FOUND',
            message: 'Le document n\'a pas pu être trouvé',
          });
      }
      return res.status(200)
        .json(doc);
    },
  );
};

module.exports.create = (req, res) => {
  const doc = new Document(req.body);
  const { file } = req;
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
        fs.unlinkSync(doc.uri);
        console.log(`successfully deleted ${doc.uri}`);
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
