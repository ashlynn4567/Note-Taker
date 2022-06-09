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
async function getNotes() {
    // read all existing notes
    const notes = await readNotes();
    let allNotes;
    try {
        allNotes = [].concat(JSON.parse(notes));
    } catch (err) {
        allNotes = [];
    }
    ;
    return allNotes;
};

// create a new note and save it to the db
async function addNotes(note) {
    // verify note has both title and description content
    if (!note.title || !note.text) {
        throw new Error("You must include both a title and description!");
    };
    // give note a unique id
    note.id = uuidv4();
    // fetch existing notes
    const existingNotes = await getNotes();
    const newNotesArray = [...existingNotes, note];
    this.writeNotes(newNotesArray);
    return note;
};

// delete an existing note by id
async function deleteNotes(id) {
    // fetch existing notes
    const notes = await getNotes();
    const updatedNotes = notes.filter((note) => note.id !== id);
    writeNotes(updatedNotes);
};

// exports
module.exports = {
    readNotes, 
    writeNotes,
    getNotes,
    addNotes,
    deleteNotes
};