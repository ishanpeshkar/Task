const mongoose = require('mongoose');

const tirthSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a Tirth name'],
    trim: true,
    unique: true,
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
  city: {
    type: String,
    required: [true, 'Please add a city'],
  },
  state: {
    type: String,
    required: [true, 'Please add a state'],
  },
  address: {
    type: String,
    required: [true, 'Please add a full address'],
  },
  images: [
    {
      type: String, // Storing URLs as requested
    }
  ],
  contactNumber: {
    type: String,
  },
  // To show who created this (Admin)
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Tirth', tirthSchema);