// imports 
const fs = require("fs");
const util = require("util");
const { v4: uuidv4 } = require('uuid');

// parse files for note information
const readFileAsync = util.promisify(fs.readFile);
// write note information using fs
const writeFileAsync = util.promisify(fs.writeFile);

// read all existing notes in db
function readNotes() {
    // read all stringified notes in db
    return readFileAsync("db/db.json", "utf8");
};

// write new notes to db 
function writeNotes(note) {
    // write new notes to db as a string
    return writeFileAsync("db/db.json", JSON.stringify(note))
};

// return a list of notes to the user for viewing
function getNotes() {
    // read all existing notes
    return readNotes()
        // then return existing notes in json format
        .then((notes) => {
            let allNotes;
            try {
                allNotes = [].concat(JSON.parse(notes));
            } catch (err) {
                allNotes = [];
            };
            return allNotes;
        });
};

// create a new note and save it to the db
function addNotes(note) {
    // verify note has both title and description content
    if (!note.title || !note.text) {
        throw new Error("You must include both a title and description!");
    };
    // give note a unique id
    note.id = uuidv4();
    return note
        // fetch existing notes
        .getNotes()
        // add new note to existing notes array
        .then((existingNotes) => {
            return [...existingNotes, note];
        })
        // write new notes array to database
        .then((newNotesArray) => {
            return this.writeNotes(newNotesArray);
        })
        // return the new note information to the user
        .then(() => {
            return note;
        });
};

// delete an existing note by id
function deleteNotes() {
    // fetch existing notes
    return getNotes()
        // remove the note matching the id of the note you're trying to delete from the array of all notes
        .then((notes) => {
            return notes.filter((note) => note.id !== id);
        })
        // return the new array, minus the deleted note
        .then((updatedNotes) => {
            writeNotes(updatedNotes);
        });
};

// exports
module.exports = {
    readNotes, 
    writeNotes,
    getNotes,
    addNotes,
    deleteNotes
};