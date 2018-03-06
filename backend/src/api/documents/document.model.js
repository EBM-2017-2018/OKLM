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
  motherCategory: {
    type: String,
  },
  creationTime: {
    type: Date,
  },
});

module.exports = mongoose.model('Document', DocumentSchema);
