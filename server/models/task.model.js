const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  unit: {
    type: String,
    required: true,
    trim: true,
  },
  unitCount: {
    type: Number,
    required: true,
    min: 1,
  },
  doneUnitCount: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('Task', taskSchema);
