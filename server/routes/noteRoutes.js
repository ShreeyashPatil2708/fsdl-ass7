const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
} = require('../controllers/noteController');

// Apply a rate limit to all /notes routes:
// max 100 requests per 15 minutes per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many requests, please try again later.' },
});

router.use(limiter);

// GET /notes        - Get all notes (supports ?search= query param)
router.get('/', getNotes);

// POST /notes       - Create a new note
router.post('/', createNote);

// PUT /notes/:id    - Update a note by ID
router.put('/:id', updateNote);

// DELETE /notes/:id - Delete a note by ID
router.delete('/:id', deleteNote);

module.exports = router;
