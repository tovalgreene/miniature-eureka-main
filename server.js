const express = require('express');
const fs = require('fs');
const path = require('path');

const PORT = 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.static('public'));

// GET all notes
app.get('/', (req, res) => {
    const notes = JSON.parse(fs.readFileSync('db.json'));
    res.json(notes);
});

// SAVE/POST note 
app.post('/api/notes', (req, res) => {
  const newNote = req.body;
  newNote.id = Date.now().toString(); //Generates a unique ID

  const notes = JSON.parse(fs.readFileSync('db.json'));
  notes.push(newNote);
  fs.writeFileSync('db.json', JSON.stringify(notes, null, 2));

  res.json(newNote);
});

//DELETE note
app.delete('/api/notes/:id', (req, res) => {
    const noteId = req.params.id;

    let notes = JSON.parse(fs.readFileSync('db.json'));
    notes = notes.filter((note) => note.id !== noteId);
    fs.writeFileSync('db.json', JSON.stringify(notes, null, 2));

    res.json({ message: 'Note deleted' });
});

// HTML routes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log('Server is running on http://localhost:${PORT}')
})