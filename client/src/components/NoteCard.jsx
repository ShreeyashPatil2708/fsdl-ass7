import React from 'react';

/**
 * NoteCard – displays a single note in a card layout
 * Props:
 *  note    – note object { _id, title, content, color, pinned, createdAt }
 *  onEdit  – callback to open the edit modal
 *  onDelete – callback to delete the note
 *  onTogglePin – callback to toggle pin state
 */
function NoteCard({ note, onEdit, onDelete, onTogglePin }) {
  // Format the creation date nicely
  const formattedDate = new Date(note.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div
      className="note-card"
      style={{ backgroundColor: note.color || '#ffffff' }}
    >
      {/* Pin button */}
      <button
        className={`pin-btn ${note.pinned ? 'pinned' : ''}`}
        onClick={() => onTogglePin(note)}
        title={note.pinned ? 'Unpin note' : 'Pin note'}
      >
        📌
      </button>

      <div className="note-card-body">
        <h3 className="note-title">{note.title}</h3>
        <p className="note-content">{note.content}</p>
      </div>

      <div className="note-card-footer">
        <span className="note-date">{formattedDate}</span>
        <div className="note-actions">
          <button
            className="action-btn edit-btn"
            onClick={() => onEdit(note)}
            title="Edit note"
          >
            ✏️
          </button>
          <button
            className="action-btn delete-btn"
            onClick={() => onDelete(note._id)}
            title="Delete note"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
}

export default NoteCard;
