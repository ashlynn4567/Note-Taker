// install all necessary dependencies
const express = require("express");
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");

// set up port and instantiate server
const PORT = process.env.PORT || 3001;
const app = express();

// set up middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// setup api routes
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

// tell the server to listen for requests on active port
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});