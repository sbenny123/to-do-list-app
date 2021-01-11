/**
 * CRUD functions for users
 */

const passport = require('passport');
const userModel = require('../models/user.model');
const idUtils = require('../utils/id');


exports.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/login');
}


exports.showRegistration = function(req, res) {
    res.render('register');
}


exports.register = async function(req, res) {
    const user_id = idUtils.generateId(6);
    const data = new userModel({                   
        user_id: user_id,
        fullName: req.body.fullName,
        username: req.body.username
    });

    const result = await userModel.register(data, req.body.password, function(err, user) {
        if (err) {
            console.log('Error registering user: ' + err);
            return res.render('register');
        }

        passport.authenticate('local')(req, res, function () {
            console.log("User has been registered");
            res.redirect('/lists');
        });
    });
};


exports.showLogIn = function(req, res) {
    res.render('login');
}


exports.logIn = function(req, res) {
};


exports.logOut = function(req, res) {
    req.logOut();

    res.redirect('/');
};
