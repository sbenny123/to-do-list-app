/**
 * The main application file:
 *  - Sets up application with settings and middleware
 *  - Handles application errors
 */

// Module dependencies
const bodyParser = require('body-parser'); // to handle reading of form data
const cors = require('cors');
const createError = require('http-errors');
const envConfig = require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const mongoSanitize = require('express-mongo-sanitize');
const path = require('path');

const dbConfig = require('./config/database.config'); // MongoDB Uri

// Routers
const indexRouter = require('./routes/index.route');
const listRouter = require('./routes/list.route');
const taskRouter = require('./routes/task.route');
const userRouter = require('./routes/user.route');

// Other variables
const app = express();
const connectionString = (process.env.MONGO_DEV_URI) // MongoDb Connection Uri 

// Connect to MongoDB
mongoose.connect(connectionString, dbConfig.params).then(
    () => { console.log('Connected to database successfully'); }, 
    (err) => { console.log('Failed to connect to database: ' + err); }
);


app.use(cors());

// Parse requests of conent-type - application/json
app.use(bodyParser.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Replace prohibited characters with _
app.use(mongoSanitize({
    replaceWith: '_'
}));

// Setup view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Render static files
app.use(express.static(path.join(__dirname, 'public')));


// Define routes for different parts of the site
app.use('/', indexRouter);
app.use('/lists', listRouter);
app.use('/tasks', taskRouter);
app.use('/', userRouter);


// Catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));  
});

// Error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // Render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;