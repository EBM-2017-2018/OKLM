const config = require('../../config/index');
const path = require('path');
const Document = require('../resources/documents/document.model');

module.exports = {};

module.exports.downloadDocument = (req, res) => {
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
      const options = {
        headers: {
          'Content-Disposition': `attachment; filename="${doc.fileName}"`,
        },
      };
      return res.sendFile(path.join(config.filesystem.uploadPath, doc.localFileName), options);
    },
  );
};
