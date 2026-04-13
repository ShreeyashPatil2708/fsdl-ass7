# 📝 MERN Notes App

A full-stack Notes application built with the **MERN** stack (MongoDB, Express, React, Node.js), inspired by Google Keep.

## ✨ Features

- **Create, Read, Update, Delete** notes
- **Search** notes by title or content (live, debounce-free)
- **Pin / Unpin** important notes (pinned notes appear at the top)
- **Color-coded** notes (8 colour options)
- **Sort**: pinned first, then newest first
- **Created date** shown on every card
- Clean, responsive **card-based UI**

---

## 📁 Folder Structure

```
fsdl-ass7/
├── client/          # React frontend (Vite)
│   ├── public/
│   └── src/
│       ├── api/         # Axios API helpers
│       ├── components/  # Navbar, NoteCard, NoteModal
│       ├── pages/       # Dashboard
│       ├── App.jsx
│       ├── main.jsx
│       └── index.css
└── server/          # Express backend
    ├── controllers/ # noteController.js
    ├── models/      # Note.js (Mongoose schema)
    ├── routes/      # noteRoutes.js
    ├── .env.example
    └── server.js
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [MongoDB](https://www.mongodb.com/) (local or Atlas)

---

### 1. Backend setup

```bash
cd server
npm install

# Create your .env from the sample
cp .env.example .env
# Edit .env and set your MONGO_URI
```

Edit `server/.env`:

```
MONGO_URI=mongodb://localhost:27017/notes-app
PORT=5000
```

Start the server:

```bash
npm run dev   # uses nodemon (auto-restart)
# or
npm start
```

The API will be available at `http://localhost:5000`.

---

### 2. Frontend setup

```bash
cd client
npm install
npm run dev
```

The React app will be available at `http://localhost:3000`.

---

## 🔌 API Endpoints

| Method | Endpoint       | Description                          |
|--------|---------------|--------------------------------------|
| GET    | `/notes`       | Get all notes (supports `?search=`)  |
| POST   | `/notes`       | Create a new note                    |
| PUT    | `/notes/:id`   | Update a note by ID                  |
| DELETE | `/notes/:id`   | Delete a note by ID                  |

### Note Schema

```js
{
  title:     String,   // required
  content:   String,   // required
  color:     String,   // optional, default '#ffffff'
  pinned:    Boolean,  // default false
  createdAt: Date,     // auto-generated
  updatedAt: Date      // auto-generated
}
```

---

## 🛠 Tech Stack

| Layer     | Technology           |
|-----------|----------------------|
| Frontend  | React 18, Vite       |
| API calls | Axios                |
| Backend   | Node.js, Express 4   |
| Database  | MongoDB, Mongoose 8  |
| Styling   | Plain CSS            |