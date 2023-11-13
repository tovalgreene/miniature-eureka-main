const path = require('path');
const express = require('express');
const router = express.Router();

// Home page route
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// Notes page route
router.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'notes.html'));
});

module.exports = router;
