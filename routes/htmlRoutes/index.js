const path = require("path");
const express = require("express");
const router = express.Router();

// set route for notes.html
router.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/notes.html"));
});

// set a wildcard route for any unforseen path
router.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/index.html"));
});

module.exports = router;