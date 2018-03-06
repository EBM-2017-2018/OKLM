const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  motherCategory: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model('Category', CategorySchema);
