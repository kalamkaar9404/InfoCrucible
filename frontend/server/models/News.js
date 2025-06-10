const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
  },
  content: {
    type: String,
    required: [true, 'Please add content'],
  },
  source: {
    type: String,
    trim: true,
  },
  url: { // Optional: Link to original article
    type: String,
    trim: true,
  },
  isVerified: { // Status from ML check (or manual verification)
    type: Boolean,
    default: null // null = unchecked, true = real, false = fake
  },
  detectionConfidence: { // Optional: Confidence score from ML
      type: Number,
      default: null
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('News', newsSchema);