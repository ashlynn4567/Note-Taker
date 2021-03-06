// install all necessary dependencies
const express = require("express");
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");

// set up port and instantiate server
const app = express();
const PORT = process.env.PORT || 3001;

// set up middleware
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// setup api routes
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

// error handling for invalid request
app.use((req, res) => {
    res.status(404).end();
});

// tell the server to listen for requests on active port
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});