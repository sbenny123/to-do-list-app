/**
 * 
 */


// Module dependencies
const express = require('express');

const router = express.Router(); // Express Router object

const listController = require('../controllers/list.controller'); // List CRUD functions
const userController = require('../controllers/user.controller'); // User authentication functions


// Create a list
router.post('/create/', userController.isLoggedIn, listController.createList);

// Update a list
router.post('/edit/:id', userController.isLoggedIn, listController.updateList);

// Delete a list
router.delete('/delete/:id', userController.isLoggedIn, listController.deleteList);

// Get all lists
router.get('/', userController.isLoggedIn, listController.getListsRoute);


module.exports = router;
