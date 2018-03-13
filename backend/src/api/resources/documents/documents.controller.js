const fs = require('fs');
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

module.exports.getOne = (req, res) => {
  Document.getOne(
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
  console.log(file);
  if (file) {
    doc.fileName = file.filename;
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
    // TODO : dans le cas d'un fichier, il ne faut pas renvoyer son adresse dans l'uri mais un lien
    // de téléchargement plutôt.
    // TODO : changer l'apidoc quand ça sera fait
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
