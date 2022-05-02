const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require('uuid');

function readNote ();

function createNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, "./db/db.json"),
        JSON.stringify(notesArray, null, 2)
    );
    return note;
};

function editNote();

function deleteNote(id, notesArray) {
    for (let i = 0; i < notesArray.length; i++) {
        let note = notesArray[i];

        if (note.id == id) {
            notesArray.splice(i, 1);
            fs.writeFileSync(
                path.join(__dirname, "./db/db.json"),
                JSON.stringify(notesArray, null, 2)
            );
        };
    };
};

module.exports = {
    readNote, 
    createNote,
    deleteNote
};