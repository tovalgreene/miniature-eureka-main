const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const dbFilePath = path.join(__dirname, '../db/db.json');

// Read all notes
router.get('/notes', (req, res) => {
  const notes = JSON.parse(fs.readFileSync(dbFilePath, 'utf8'));
  res.json(notes);
});

// Create new note
router.post('/notes', (req, res) => {
  const newNote = req.body;
  const notes = JSON.parse(fs.readFileSync(dbFilePath, 'utf8'));

  newNote.id = notes.length + 1;

  notes.push(newNote);
  fs.writeFileSync(dbFilePath, JSON.stringify(notes));

  res.json(newNote);
});

module.exports = router;