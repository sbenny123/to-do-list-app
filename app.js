/**
 * The main application file:
 *  - Sets up application with settings and middleware
 *  - Handles application errors
 */

const bodyParser = require('body-parser'); // to handle reading of form data
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

const dbConfig = require('./config/database.config');

const connectionString = dbConfig.url.replace("<password>", dbConfig.password);

//const listRouter = require('./routes/list.routes');
//const taskRouter = require('./routes/task.routes');
//const userRouter = require('./routes/user.routes');



// Connect to the database
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(connection => {
    console.log('Connected to DB successfully');
},
error => {
    console.log('Failed to connect to database: ' + error);
});

app.use(bodyParser.urlencoded({ extended: true }));

// View engine setup
app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'pug');

// Render static files
//app.use(express.static(path.join(__dirname, 'statics')));

app.get('/',(req, res) => {
    res.send('Hello World!');
});


// Define routes for different parts of the site
//app.use('/lists', listRouter);
//app.use('/tasks', taskRouter);
//app.use('/users', userRouter);

module.exports = app;