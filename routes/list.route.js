/**
 * 
 */


// Module dependencies
const express = require('express');

const router = express.Router(); // Express Router object
const listController = require('../controllers/list.controller'); // List controller


// Create a list
router.post('/lists', listController.createList);

// Update a list
router.put('/lists/:id', listController.updateList);

// Delete a list
router.delete('/lists/:id', listController.deleteList);

// Get a list
router.get('/lists/:id', listController.getList);

// Get all lists
router.get('/lists', listController.getAllLists);

module.exports = router;
