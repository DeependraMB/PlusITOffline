const mongoose = require('mongoose');

const constituencySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  district: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'District',
    required: true
  },
  assemblies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Assembly' }]
});

const Constituency = mongoose.model('Constituency', constituencySchema);

module.exports = Constituency;
