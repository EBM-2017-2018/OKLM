const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  uri: {
    type: String,
    required: true,
  },
  isLocalFile: {
    type: Boolean,
    default: false,
  },
  fileName: {
    type: String,
  },
  localFileName: {
    type: String,
  },
  motherCategory: {
    type: String,
  },
  creationTime: {
    type: Date,
    default: () => Date.now(),
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

DocumentSchema.index({ title: 'text' });
module.exports = mongoose.model('Document', DocumentSchema);
