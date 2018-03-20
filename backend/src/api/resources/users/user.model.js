const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  creationTime: {
    type: Date,
    default: () => Date.now(),
  },
  linkappId: {
    type: String,
  },
});

module.exports = mongoose.model('User', UserSchema);
