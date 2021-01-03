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

const dbConfig = require('./config/database.config');

const connectionString = dbConfig.url.replace("<password>", dbConfig.password);

//const listRouter = require('./routes/list.routes');
//const taskRouter = require('./routes/task.routes');
//const userRouter = require('./routes/user.routes');


const List = require('./models/list.model');
const testList = new List({
    name: 'A test'
});
const Task = require('./models/task.model');
const testTask = new Task({
    name: 'Test task'
});

// Connect to the database
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.once('open', _ => {           
    console.log('Connected to database successfully');  
});
  
db.on('error', error => {       
    console.log('Failed to connect to database: ' + error);    
});

testList.save(function (error, document) {
    if (error) console.error(error)
    console.log(document)  
});
testTask.save(function (error, document) {
    if (error) console.error(error)
    console.log(document)  
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Replace prohibited characters with _
app.use(mongoSanitize({
    replaceWith: '_'
}));


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