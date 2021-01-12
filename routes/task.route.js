/**
 * Creation of task routes using CRUD functions
 */


    // Module dependencies
    const express = require('express');

    const router = express.Router(); // Express Router object
    const taskController = require('../controllers/task.controller'); // Task controller
    const userController = require('../controllers/user.controller');

    // Note: Emit calls from socketApi call the controller functions for create, update and delete

    // Create a task
    //router.post('/create', taskController.createTaskNew);

    // Update a task
    //router.put('/:id', userController.isLoggedIn, taskController.updateTask);

    // Delete a task
    //router.delete('/remove/:id', taskController.deleteTask);
    

    // Get all tasks
    router.get('/:list_id', userController.isLoggedIn, taskController.getTasksRoute);


module.exports = router;
