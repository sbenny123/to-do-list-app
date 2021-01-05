/**
 * 
 */


// Module dependencies
const express = require('express');

const router = express.Router(); // Express Router object
const listController = require('../controllers/list.controller'); // List controller


router.post('/list', listController.createList); // to create a list

module.exports = router;
