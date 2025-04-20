const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name:     { type: String, required: true },
  type:     { type: String, enum: ['income', 'expense', 'saving'], required: true },
  user:     { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Category', categorySchema);
