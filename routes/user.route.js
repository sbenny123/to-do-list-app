/**
 * 
 */

// Module dependencies
const express = require('express');
const passport = require('passport');

const router = express.Router(); // Express Router object
const userController = require('../controllers/user.controller'); // User controller


// Get registration page and register user
router.get('/register', userController.showRegistration);
router.post('/register', userController.register);

router.get('/login', userController.showLogIn);
router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/lists')
});

router.get('/user-profile', userController.showUserProfile);


module.exports = router;