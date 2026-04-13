import React, { useState, useEffect, useCallback } from 'react';
import NoteCard from '../components/NoteCard';
import NoteModal from '../components/NoteModal';
import {
  fetchNotes,
  createNote,
  updateNote,
  deleteNote,
} from '../api/notes';

/**
 * Dashboard – main page that shows all notes in a responsive grid
 */
function Dashboard({ searchQuery }) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editNote, setEditNote] = useState(null);

  // Load notes from the API (re-runs whenever searchQuery changes)
  const loadNotes = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await fetchNotes(searchQuery);
      setNotes(data);
    } catch (err) {
      setError('Failed to load notes. Make sure the server is running.');
    } finally {
      setLoading(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  // Open modal for creating a new note
  const handleAddNote = () => {
    setEditNote(null);
    setIsModalOpen(true);
  };

  // Open modal pre-filled for editing
  const handleEditNote = (note) => {
    setEditNote(note);
    setIsModalOpen(true);
  };

  // Save: create or update depending on whether editNote is set
  const handleSaveNote = async (noteData) => {
    try {
      if (editNote) {
        await updateNote(editNote._id, noteData);
      } else {
        await createNote(noteData);
      }
      setIsModalOpen(false);
      setEditNote(null);
      loadNotes();
    } catch (err) {
      setError('Failed to save note. Please try again.');
    }
  };

  // Delete a note after confirming
  const handleDeleteNote = async (id) => {
    if (!window.confirm('Delete this note?')) return;
    try {
      await deleteNote(id);
      loadNotes();
    } catch (err) {
      setError('Failed to delete note. Please try again.');
    }
  };

  // Toggle pinned state
  const handleTogglePin = async (note) => {
    try {
      await updateNote(note._id, { ...note, pinned: !note.pinned });
      loadNotes();
    } catch (err) {
      setError('Failed to update note. Please try again.');
    }
  };

  // Split notes into pinned and others for display
  const pinnedNotes = notes.filter((n) => n.pinned);
  const otherNotes = notes.filter((n) => !n.pinned);

  return (
    <main className="dashboard">
      {/* Error banner */}
      {error && (
        <div className="error-banner">
          <span>{error}</span>
          <button onClick={() => setError('')}>✕</button>
        </div>
      )}

      {/* Add note button */}
      <button className="fab" onClick={handleAddNote} title="Add new note">
        +
      </button>

      {/* Loading state */}
      {loading ? (
        <div className="loading">Loading notes…</div>
      ) : notes.length === 0 ? (
        <div className="empty-state">
          <p>🗒️ No notes found.</p>
          <p>Click <strong>+</strong> to create your first note!</p>
        </div>
      ) : (
        <>
          {/* Pinned section */}
          {pinnedNotes.length > 0 && (
            <section className="notes-section">
              <h2 className="section-label">📌 Pinned</h2>
              <div className="notes-grid">
                {pinnedNotes.map((note) => (
                  <NoteCard
                    key={note._id}
                    note={note}
                    onEdit={handleEditNote}
                    onDelete={handleDeleteNote}
                    onTogglePin={handleTogglePin}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Other notes section */}
          {otherNotes.length > 0 && (
            <section className="notes-section">
              {pinnedNotes.length > 0 && (
                <h2 className="section-label">Other Notes</h2>
              )}
              <div className="notes-grid">
                {otherNotes.map((note) => (
                  <NoteCard
                    key={note._id}
                    note={note}
                    onEdit={handleEditNote}
                    onDelete={handleDeleteNote}
                    onTogglePin={handleTogglePin}
                  />
                ))}
              </div>
            </section>
          )}
        </>
      )}

      {/* Add / Edit modal */}
      <NoteModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditNote(null);
        }}
        onSave={handleSaveNote}
        editNote={editNote}
      />
    </main>
  );
}

export default Dashboard;
