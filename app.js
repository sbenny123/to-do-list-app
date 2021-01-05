/**
 * The main application file:
 *  - Sets up application with settings and middleware
 *  - Handles application errors
 */

const bodyParser = require('body-parser'); // to handle reading of form data
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const mongoSanitize = require('express-mongo-sanitize');
const path = require('path');

const app = express();

const dbConfig = require('./config/database.config'); // MongoDB Uri

// Routers
const listRouter = require('./routes/list.route');

// 
const connectionString = dbConfig.url.replace("<password>", dbConfig.password);

var db;


// Connect to the database
mongoose.connect(connectionString, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch((err) => {
    // Handle errors on initial connections
    console.log('Error estabilishing initial connection: ' + err);
});

db = mongoose.connection;

db.on('open', () => {           
    console.log('Connected to database successfully');  
});

// Handle errors after initial connection
db.on('error', (err) => {       
    console.log('Failed to connect to database: ' + err);    
});


app.use(cors());

// Parse requests of conent-type - application/json
app.use(bodyParser.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Replace prohibited characters with _
app.use(mongoSanitize({
    replaceWith: '_'
}));


// View engine setup
app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'pug');


// Render static files
//app.use(express.static(path.join(__dirname, 'statics')));


// Define routes for different parts of the site
app.use('/lists', listRouter);

module.exports = app;