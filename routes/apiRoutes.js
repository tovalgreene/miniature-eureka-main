const express = require('express');
const router = express.Router();
const fs = requre('fs');
const path = require('path');

// Read all notes
router.get('/notes', (req, res) => {
    const notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    res.json(notes);
});

// Create new note
router.post('/notes', (req, res) => {
  const newNote = req.body;
  const notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));

  newNote.id = notes.length + 1;

  notes.push(newNote);
  fs.writeFileSync('./db/db.json', JSON.stringify(notes));

  res.json(newNote);
});

module.exports = router;