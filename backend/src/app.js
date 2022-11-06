const express = require('express');
const app = express();
const cors = require('cors');
const { prueba } = require('./controllers/articleControllers');

// Settings
app.set('port', process.env.PORT || 3100); // Define port of server

// Setting Cors
app.use(cors());

// Convert body to JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create routes
app.use("/api", require('./routes/article.routes')) // Article routes


// Export the modules
module.exports = app;