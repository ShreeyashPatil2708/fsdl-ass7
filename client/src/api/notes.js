import axios from 'axios';

// Base URL – uses Vite proxy in dev, or set VITE_API_URL in .env for production
const API_BASE = import.meta.env.VITE_API_URL || '';

const api = axios.create({
  baseURL: `${API_BASE}/notes`,
  headers: { 'Content-Type': 'application/json' },
});

// Fetch all notes, with optional search query string
export const fetchNotes = (search = '') =>
  api.get('/', { params: search ? { search } : {} });

// Create a new note
export const createNote = (data) => api.post('/', data);

// Update an existing note by id
export const updateNote = (id, data) => api.put(`/${id}`, data);

// Delete a note by id
export const deleteNote = (id) => api.delete(`/${id}`);
