/**
 * The main application file:
 *  - Sets up application with settings and middleware
 *  - Handles application errors
 */

// Module dependencies
const bodyParser = require('body-parser'); // to handle reading of form data
const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const flash = require('connect-flash');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const mongoSanitize = require('express-mongo-sanitize');
const passport = require('passport');
const path = require('path');

// Config
const authConfig = require('./config/auth.config');

dotenv.config();
let connectionString = "";

// Sort MongoDb database to use
switch (process.env.NODE_ENV) {
    case 'test':
        connectionString = process.env.MONGO_TEST_URI;
        break;

    case 'production':
        connectionString = process.env.MONGO_PROD_URI;
    
    default: 
        connectionString = process.env.MONGO_TEST_URI;
        break;
}

// Models
const userModel = require('./models/user.model');

// Routers
const indexRouter = require('./routes/index.route');
const listRouter = require('./routes/list.route');
const taskRouter = require('./routes/task.route');
const userRouter = require('./routes/user.route');

// Other variables
const app = express();

var db = mongoose.connect(connectionString, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => { 
    console.log('Connected to database successfully');
})
.catch((err) => { console.log('Failed to connect to database: ' + err); });


app.use(cors());
app.use(bodyParser.json()); // Parses requests of content-type - application/json
app.use(bodyParser.urlencoded({ extended: true })); // Parses requests of content-type - application/x-www-form-urlencoded
app.use(mongoSanitize({
    replaceWith: '_'
})); // Replaces prohibited characters with _
app.use(session({
    secret: authConfig.secret,
    resave: false,
    saveUninitialized: false
}));
app.use(flash());


// Setup view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(passport.initialize());
app.use(passport.session());


// Render static files
app.use(express.static(path.join(__dirname, 'public')));


// Passport config
passport.use(new LocalStrategy(userModel.authenticate()));
passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());

//current User
app.use(function (req, res, next){
    res.locals.currentUser = req.user;
    next();
})

// Define routes for different parts of the site
app.use('/', indexRouter);
app.use('/lists', listRouter);
app.use('/tasks', taskRouter);
app.use('/', userRouter);


// 404 error handler
app.use(function(req, res, next) {
    res.status(404);
    res.render('404', { url: req.url });
});

// All other errors handler
app.use(function(err, req, res, next) {
    console.log(err);
    res.status(err.status || 500);
    res.render('500', { error: err });
});


module.exports = app;