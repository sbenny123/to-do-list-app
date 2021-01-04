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

// Routers
const listRouter = require('./routes/list.route');
//const taskRouter = require('./routes/task.route');
//const userRouter = require('./routes/user.route');

const connectionString = dbConfig.url.replace("<password>", dbConfig.password);

var db;


// Connect to the database
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

db = mongoose.connection;

db.on('open', () => {           
    console.log('Connected to database successfully');  
});
  
db.on('error', (err) => {       
    console.log('Failed to connect to database: ' + err);    
});

/*testList.save(function (err, doc) {
    if (err) console.error(err)
    console.log(document)  
});
testTask.save(function (error, document) {
    if (error) console.error(error)
    console.log(document)  
});*/

app.use(bodyParser.json());
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

app.use('/', listRouter);



// Define routes for different parts of the site
//app.use('/lists', listRouter);
//app.use('/tasks', taskRouter);
//app.use('/users', userRouter);

module.exports = app;