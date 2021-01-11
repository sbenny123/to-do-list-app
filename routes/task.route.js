/**
 * 
 */


// Module dependencies
const express = require('express');

const router = express.Router(); // Express Router object
const taskController = require('../controllers/task.controller'); // Task controller
const userController = require('../controllers/user.controller');

    // Create a task
    //router.post('/create', taskController.createTaskNew);

    // Update a task
    router.put('/:id', userController.isLoggedIn, taskController.updateTask);

    // Delete a task
    //router.delete('/remove/:id', taskController.deleteTask);

    // Get a task
    router.get('/one/:id', userController.isLoggedIn, taskController.getTask);

    // Get all tasks
    router.get('/:list_id', userController.isLoggedIn, taskController.getTasksRoute);


module.exports = router;
