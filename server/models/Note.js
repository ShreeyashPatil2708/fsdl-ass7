const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema(
  {
    // Title of the note
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    // Main content of the note
    content: {
      type: String,
      required: [true, 'Content is required'],
      trim: true,
    },
    // Optional color tag (e.g. "yellow", "blue", "green")
    color: {
      type: String,
      default: '#ffffff',
      trim: true,
    },
    // Whether the note is pinned to the top
    pinned: {
      type: Boolean,
      default: false,
    },
  },
  {
    // Automatically adds createdAt and updatedAt fields
    timestamps: true,
  }
);

module.exports = mongoose.model('Note', noteSchema);
