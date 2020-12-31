/**
 * The main application file:
 *  - Sets up application with settings and middleware
 *  - Handles application errors
 */

const express = require('express');
const path = require('path');

//const listRouter = require('./routes/list.routes');
//const taskRouter = require('./routes/task.routes');
//const userRouter = require('./routes/user.routes');

const app = express();


// View engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'pug');

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