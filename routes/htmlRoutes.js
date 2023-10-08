const express = require('express');
const path = require('path');
const router = express.Router();

//Route to notes.html
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
});

//Route to index.html for all other routes
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = router;