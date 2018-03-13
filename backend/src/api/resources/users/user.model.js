const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  creationTime: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model('User', UserSchema);
