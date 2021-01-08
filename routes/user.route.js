/**
 * 
 */

// Module dependencies
const express = require('express');

const router = express.Router(); // Express Router object
const userController = require('../controllers/user.controller'); // User controller

// Get registration page and register user
router.get('/register', userController.showRegistration);
router.post('/register', userController.register);

router.get('/login', userController.showLogIn);
router.post('/login', userController.logIn);


/*router.get('/userprofile', userController.getUserProfile);

router.get('/users/sign_out', userController.signOut);
router.get('/users/:id', userController.show);*/

module.exports = router;