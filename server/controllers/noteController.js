const Note = require('../models/Note');

/**
 * Escapes special regex characters in a user-supplied string to prevent
 * ReDoS / NoSQL-injection via crafted $regex patterns.
 */
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// GET /notes - Retrieve all notes, with optional search query
// Pinned notes appear first, then sorted by newest createdAt
const getNotes = async (req, res) => {
  try {
    const { search } = req.query;

    // Build search filter if a query string is provided
    // Escape the user input before embedding it in a regex to prevent injection
    const filter = search
      ? {
          $or: [
            { title: { $regex: escapeRegex(search), $options: 'i' } },
            { content: { $regex: escapeRegex(search), $options: 'i' } },
          ],
        }
      : {};

    // Pinned notes come first (-1 = desc for pinned true), then newest first
    const notes = await Note.find(filter).sort({ pinned: -1, createdAt: -1 });

    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /notes - Create a new note
const createNote = async (req, res) => {
  try {
    const { title, content, color, pinned } = req.body;

    const note = new Note({ title, content, color, pinned });
    const savedNote = await note.save();

    res.status(201).json(savedNote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PUT /notes/:id - Update an existing note by ID
const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, color, pinned } = req.body;

    // Explicitly type-cast each field to prevent operator injection
    const updateFields = {
      title:   String(title   ?? ''),
      content: String(content ?? ''),
      color:   String(color   ?? '#ffffff'),
      pinned:  Boolean(pinned),
    };

    const updatedNote = await Note.findByIdAndUpdate(
      id,
      updateFields,
      { new: true, runValidators: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.status(200).json(updatedNote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE /notes/:id - Delete a note by ID
const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedNote = await Note.findByIdAndDelete(id);

    if (!deletedNote) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getNotes, createNote, updateNote, deleteNote };
