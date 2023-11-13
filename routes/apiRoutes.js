const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

// The path to the database file
const dbPath = path.join(__dirname, '..', 'db', 'db.json');

// GET route for retrieving notes
router.get('/notes', (req, res) => {
  fs.readFile(dbPath, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "An error occurred while reading the file." });
    }
    try {
      const dbNotes = JSON.parse(data);
      res.json(dbNotes);
    } catch (parseError) {
      console.error(parseError);
      return res.status(500).json({ error: "An error occurred while parsing the JSON data." });
    }
  });
});

// POST route for creating a new note
router.post('/notes', (req, res) => {
  fs.readFile(dbPath, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "An error occurred while reading the file." });
    }
    try {
      // Parse the existing notes
      const dbNotes = JSON.parse(data);
      // Create a new note with a unique id
      const newNote = { id: uuidv4(), ...req.body };
      // Add the new note
      dbNotes.push(newNote);
      // Write the new notes array back to the file
      fs.writeFile(dbPath, JSON.stringify(dbNotes, null, 2), (writeErr) => {
        if (writeErr) {
          console.error(writeErr);
          return res.status(500).json({ error: "An error occurred while writing the file." });
        }
        res.json(newNote);
      });
    } catch (parseError) {
      console.error(parseError);
      return res.status(500).json({ error: "An error occurred while parsing the JSON data." });
    }
  });
});

// DELETE route for deleting a note
router.delete('/notes/:id', (req, res) => {
  fs.readFile(dbPath, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "An error occurred while reading the file." });
    }
    try {
      const dbNotes = JSON.parse(data);
      // Filter out the note with the given id
      const newDb = dbNotes.filter(note => note.id !== req.params.id);
      // Write the new db back to the file
      fs.writeFile(dbPath, JSON.stringify(newDb, null, 2), (writeErr) => {
        if (writeErr) {
          console.error(writeErr);
          return res.status(500).json({ error: "An error occurred while writing the file." });
        }
        res.json({ message: "Note deleted successfully." });
      });
    } catch (parseError) {
      console.error(parseError);
      return res.status(500).json({ error: "An error occurred while parsing the JSON data." });
    }
  });
});

module.exports = router;
