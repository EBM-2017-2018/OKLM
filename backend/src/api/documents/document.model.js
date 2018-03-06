const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
  },
  creationTime: {
    type: Date,
  },
});

module.exports = mongoose.model('Document', DocumentSchema);