/**
 * CRUD functions for users
 */

const jwt = require('jsonwebtoken');

const userModel = require('../models/user.model');
const authConfig = require('../config/auth.config');
const idUtils = require('../utils/id');

const passport = require('passport');


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

   /* // Create and save user to database
    const newUser = await data.save(function(err, user) {
        if (err) {
            console.log("Error registering user: " + err);
            res.redirect("/register");
        
        } else {
            res.redirect("/");
        }
    });*/
};


exports.showLogIn = function(req, res) {
    res.render('login');
}


exports.logIn = function(req, res) {

   /* var result = passport.authenticate('local') {

    }
    (req, res, function () {
        res.redirect('/');
    });*/

    /* userModel.findOne({
        email: req.body.email
    }, function(err, user) {

        switch (true) {
            case (err):
                console.log("Error logging in user: " + err);
                break;
            
            case (!user):
                console.log("User's email not found");
                break;

            default:
                user.comparePassword(req.body.password, function(err, isMatch) {

                    if (!isMatch) {
                        console.log("Wrong password");

                    } else {
                        let token = jwt.sign(
                            // payload data
                            { 
                                email: user.email, 
                                fullName: user.fullName, 
                                _id: user._id 
                            }, 
                            authConfig.secret, 
                            { 
                                expiresIn: 86400 // 24 hours
                            });

                            user.password = undefined;

                        /*res.header("auth-token", token).json({
                            error: null,
                            data: {
                              token,
                            },
                        });*/
                 /*   }
                });
                break;
        }
    });*/
};

exports.logOut = function(err, res) {
    req.logOut();

    res.redirect('/');
};

exports.showUserProfile = function(req, res) {
    res.render('user-profile');
};


// Update a user
exports.updateUser = async function(req, res, next) {
    try {
        const id = req.params.id;
        const data = {
            
        };

        const doc = await userModel.findByIdAndUpdate(id, data, {
            new: true, // updated data is returned to function
            runValidators: true
        });


        res.status(200).json({
            status: 'success',
            data: {
                doc
            }
        });

    } catch (err) {
        res.status(500).json({
            status: 'failure',
            message: err.message,
            data: {
                doc
            }
        })

        next(err);
    }
};


// Get a user
exports.getUser = async function(req, res, next) {
    try {
        const id = req.params.id;

        const doc = await userModel.findById(id);


        res.status(200).json({
            status: 'success',
            data: {
                doc
            }
        });

    } catch (err) {
        res.status(500).json({
            status: 'failure',
            message: err.message,
            data: {
                doc
            }
        })

        next(err);
    }
};


// Get all users
exports.getAllUsers = async function(req, res, next) {
    try {
        const doc = await userModel.find();

        res.status(200).json({
            status: 'success',
            results: doc.length,
            data: {
                data: doc
            }
        });

    } catch (err) {
        res.status(500).json({
            status: 'failure',
            message: err.message,
            data: {
                doc
            }
        })

        next(err);
    }
};
