/**
 * User authentication routes - /register, /login and /logout
 */

// Module dependencies
const express = require('express');
const passport = require('passport');

const router = express.Router(); // Express Router object
const userController = require('../controllers/user.controller'); // User controller


// Get registration page and register user
router.get('/register', userController.showRegistration);
router.post('/register', userController.register);


// Get login page and login user
router.get('/login', userController.showLogIn);
router.post('/login', passport.authenticate('local', {
    successRedirect: '/lists',
    failureRedirect: '/login'
}), userController.logIn);


// Logout user
router.get('/logout', userController.logOut);


module.exports = router;