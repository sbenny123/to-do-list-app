/**
 * 
 */


// Module dependencies
const express = require('express');

const router = express.Router(); // Express Router object
const listController = require('../controllers/list.controller'); // List controller


// Create a list
router.post('/', listController.createList);

// Update a list
router.put('/:id', listController.updateList);

// Delete a list
router.delete('/:id', listController.deleteList);

// Get a list
router.get('/:id', listController.getList);

// Get all lists
router.get('/', listController.getAllLists);

module.exports = router;
