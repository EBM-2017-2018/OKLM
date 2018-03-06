const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  motherCategory: {
    type: String,
    defaultValue: null,
  },
});

module.exports = mongoose.model('Category', CategorySchema);
