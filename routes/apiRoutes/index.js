const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const {
    readNote,
    createNote,
    deleteNote
} = require("../../lib/controller");

router.get("/notes", (req, res) => {
    fs.readFile("db/db.json", "utf-8", (err, data) => {
        if (err) {
            // res.sendStatus(400).json({ error: err.message });
            throw err;
        };
        res.send(JSON.parse(data));
    });
});

router.post("/notes", (req, res) => {
    fs.readFile("db/db.json", "utf-8", (err, data) => {
        if (err) {
            res.sendStatus(400).json({ error: err.message });
        };
        
        const notes = JSON.parse(data);
        const newNote = req.body;
        newNote.id = uuidv4();
        notes.push(newNote);

        fs.writeFile("db/db.json", JSON.stringify(notes), (err) => {
            if (err) {
                res.sendStatus(400).json({ error: err.message });
            };
            res.json(newNote);
        });
    });
});

router.delete(`/notes/:id`, (req, res) => {
    deleteNote(req.params.id, savedNotes);
    res.json(savedNotes);
});

module.exports = router;
