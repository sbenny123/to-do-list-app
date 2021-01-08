/**
 * 
 */

// Module dependencies
const express = require('express');

const router = express.Router(); // Express Router object
const userController = require('../controllers/user.controller'); // User controller

router.post('/register', userController.register);
//router.post('/login', userController.logIn);
/*router.get('/userprofile', userController.getUserProfile);


router.post('/users', validation.validateSignup, userController.create);
router.post('/users/sign_in', validation.validateSignin, userController.signIn);
router.get('/users/sign_out', userController.signOut);
router.get('/users/:id', userController.show);*/

module.exports = router;