require('dotenv').config();
const app = require('./app')
const { connection } = require("./database/connections");


// Connecting to the database
connection();

// Creating server
const port = app.get('port')
app.listen(port, () => {
    console.log(`Server on port ${port}`);
})