// install dependencies
const express = require("express");
const router = express.Router();
const controller = require("../../lib/controller");

// return all notes 
router.get("/notes", (req, res) => {
    controller
        .getNotes(req.body)
        .then((notes) => {
            return res.json(notes);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

// create and save a new note
router.post("/notes", (req, res) => {
    controller
        .addNotes(req.body)
        .then((note) => {
            return res.json(note);
        })
        .catch((err) => {
            return res.status(500).json(err);
        });
});

// delete a note
router.delete(`/notes/:id`, (req, res) => {
    controller
        .deleteNotes(req.params.id)
        .then(() => {
            return res.status(200).json({ message: "Note deleted successfully" });
        })
        .catch((err) => {
            return res.status(500).json(err);
        });
});

// exports
module.exports = router;