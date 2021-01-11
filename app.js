/**
 * The main application file:
 *  - Sets up application with settings and middleware
 *  - Handles application errors
 */

// Module dependencies
const bodyParser = require('body-parser'); // to handle reading of form data
const cors = require('cors');
//const envConfig = require('dotenv').config();
const express = require('express');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
//const mongoose = require('mongoose');
const mongoSanitize = require('express-mongo-sanitize');
const passport = require('passport');
const path = require('path');

// Config
const authConfig = require('./config/auth.config');
//const dbConfig = require('./config/database.config'); // MongoDB Uri

// Models
const userModel = require('./models/user.model');

// Routers
const indexRouter = require('./routes/index.route');
const listRouter = require('./routes/list.route');
const taskRouter = require('./routes/task.route');
const userRouter = require('./routes/user.route');

//
//const connectionString = (process.env.MONGO_DEV_URI) // MongoDb Connection Uri 

// Other variables
const app = express();


// Connect to MongoDB
/*mongoose.connect(connectionString, dbConfig.params)
.then(() => { console.log('Connected to database successfully'); })
.catch((err) => { console.log('Failed to connect to database: ' + err); });*/


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



/*app.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
        jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function(err, decode) {
          if (err) req.user = undefined;
          req.user = decode;
          next();
        });
      } else {
        req.user = undefined;
        next();
    }
});*/

// Error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    //res.locals.message = err.message;
    //res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // Render the error page
    //res.status(err.status || 500);
    console.log(err);
    res.render('error');
});

module.exports = app;