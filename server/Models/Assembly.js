const mongoose = require('mongoose');

const assemblySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  constituency: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Constituency',
    required: true
  }
});

const Assembly = mongoose.model('Assembly', assemblySchema);

module.exports = Assembly;
