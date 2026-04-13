import React, { useState, useEffect } from 'react';

// Available color options for note cards
const COLOR_OPTIONS = [
  { label: 'White', value: '#ffffff' },
  { label: 'Yellow', value: '#fff9c4' },
  { label: 'Green', value: '#c8e6c9' },
  { label: 'Blue', value: '#bbdefb' },
  { label: 'Pink', value: '#f8bbd0' },
  { label: 'Purple', value: '#e1bee7' },
  { label: 'Orange', value: '#ffe0b2' },
  { label: 'Teal', value: '#b2dfdb' },
];

/**
 * NoteModal – Add / Edit note dialog
 * Props:
 *  isOpen    – whether the modal is visible
 *  onClose   – callback to close the modal
 *  onSave    – callback(noteData) to save / update the note
 *  editNote  – note object when editing, null when creating
 */
function NoteModal({ isOpen, onClose, onSave, editNote }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [color, setColor] = useState('#ffffff');
  const [pinned, setPinned] = useState(false);
  const [errors, setErrors] = useState({});

  // Populate fields when editing an existing note
  useEffect(() => {
    if (editNote) {
      setTitle(editNote.title);
      setContent(editNote.content);
      setColor(editNote.color || '#ffffff');
      setPinned(editNote.pinned || false);
    } else {
      resetForm();
    }
  }, [editNote, isOpen]);

  const resetForm = () => {
    setTitle('');
    setContent('');
    setColor('#ffffff');
    setPinned(false);
    setErrors({});
  };

  const validate = () => {
    const errs = {};
    if (!title.trim()) errs.title = 'Title is required';
    if (!content.trim()) errs.content = 'Content is required';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    onSave({ title: title.trim(), content: content.trim(), color, pinned });
    resetForm();
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div
        className="modal"
        style={{ backgroundColor: color }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2 className="modal-title">{editNote ? 'Edit Note' : 'Add Note'}</h2>
          <button className="modal-close" onClick={handleClose} title="Close">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {/* Title */}
          <div className="form-group">
            <input
              type="text"
              className={`form-input ${errors.title ? 'input-error' : ''}`}
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {errors.title && (
              <span className="error-msg">{errors.title}</span>
            )}
          </div>

          {/* Content */}
          <div className="form-group">
            <textarea
              className={`form-textarea ${errors.content ? 'input-error' : ''}`}
              placeholder="Take a note…"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={5}
            />
            {errors.content && (
              <span className="error-msg">{errors.content}</span>
            )}
          </div>

          {/* Color picker */}
          <div className="color-picker">
            <span className="color-picker-label">Color:</span>
            <div className="color-options">
              {COLOR_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  className={`color-swatch ${color === opt.value ? 'selected' : ''}`}
                  style={{ backgroundColor: opt.value }}
                  title={opt.label}
                  onClick={() => setColor(opt.value)}
                />
              ))}
            </div>
          </div>

          {/* Pin toggle */}
          <div className="pin-toggle">
            <label className="pin-label">
              <input
                type="checkbox"
                checked={pinned}
                onChange={(e) => setPinned(e.target.checked)}
              />
              <span>📌 Pin this note</span>
            </label>
          </div>

          {/* Actions */}
          <div className="modal-actions">
            <button type="button" className="btn btn-cancel" onClick={handleClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-save">
              {editNote ? 'Update' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NoteModal;
