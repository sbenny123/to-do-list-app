/**
 * 
 */


// Module dependencies
const express = require('express');

const router = express.Router(); // Express Router object
const listController = require('../controllers/list.controller'); // List controller


// Create a list
router.post('/create/', listController.createList);

// Update a list
router.post('/edit/:id', listController.updateList);

// Delete a list
router.delete('/delete/:id', listController.deleteList);

// Get a list
//router.get('/view/:id', listController.getList);

// Get all lists
router.get('/', listController.getAllLists);

module.exports = router;
