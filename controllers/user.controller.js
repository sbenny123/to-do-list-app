/**
 * Authentication functions - for registration and login
 */

const passport = require('passport');
const userModel = require('../models/user.model');
const idUtils = require('../utils/id');
const modelConfig = require('../config/models.config');


/**
 * Checks if the user has already been authenticated - used in others routes before making calls to get data 
 */
exports.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/login');
}


// Get method for register router
exports.showRegistration = function(req, res) {
    res.render('register', { error: null});
}


// Add user to database and salt and hash password
exports.register = async function(req, res) {
    const user_id = idUtils.generateId(modelConfig.USER_ID_LENGTH);
    const data = new userModel({                   
        user_id: user_id,
        fullName: req.body.fullName,
        username: req.body.username
    });

    const result = await userModel.register(data, req.body.password, function(err, user) {
        if (err) {
            console.log('Error registering user: ' + err.message);

            return res.render('register', { error: err.name });
        }

        passport.authenticate('local')(req, res, function () {
            console.log("User has been registered");
            res.redirect('/lists');
        });
    });
};


// GET method for login
exports.showLogIn = function(req, res) {
    res.render('login');
}


// Any other actions after authenticating user using passport-local
exports.logIn = function(req, res) {
};


// Logs out user and returns them to the homepage
exports.logOut = function(req, res) {
    req.logOut();
    res.redirect('/');
};
