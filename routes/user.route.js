/**
 * 
 */

// Module dependencies
const express = require('express');

const router = express.Router(); // Express Router object
const userController = require('../controllers/user.controller'); // User controller

const passport = require('passport');

// Get registration page and register user
router.get('/register', userController.showRegistration);
router.post('/register', userController.register);

router.get('/login', userController.showLogIn);
router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/user-profile')
});

router.get('/user-profile', userController.showUserProfile);


module.exports = router;