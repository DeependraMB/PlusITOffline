const mongoose = require('mongoose');

const districtSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  constituencies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Constituency' }]
});

const District = mongoose.model('District', districtSchema);

module.exports = District;
