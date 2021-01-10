/**
 * CRUD functions for tasks
 */

const taskModel = require('../models/task.model');
const listModel = require('../models/list.model');

const socketApi = require('../config/socket.config');


// Create and save a task
exports.createTask = async function(req, res) {
    const list_id = req.body.list_id;

    try {
        const data = {
            name: req.body.name,
            completed: false,
            list_id: list_id
        };

        const doc = await taskModel.create(data);

        res.redirect("/tasks/" + list_id);

    } catch (err) {
        console.log("Error creating task: " + err);
        res.redirect("/tasks/" + list_id);
    }
};


// Update a task
exports.updateTask = async function(req, res, next) {
    try {
        const id = req.params.id;
        const data = {
            name: req.body.name,
            status: req.body.status,
            list_id: req.body.list_id
        };

        const doc = await taskModel.findByIdAndUpdate(id, data, {
            new: true, // updated data is returned to function
            runValidators: true
        });


        res.status(200).json({
            status: 'success',
            data: {
                doc
            }
        });

    } catch (err) {
        res.status(500).json({
            status: 'failure',
            message: err.message,
            data: {
                doc
            }
        })

        next(err);
    }
};


// Delete a task
exports.deleteTask = async function(req, res, next) {
    try {
        const id = req.params.id;

        const doc = await taskModel.findByIdAndDelete(id);


        res.status(204).json({
            status: 'success',
            data: null
        });

    } catch (err) {
        res.status(500).json({
            status: 'failure',
            message: err.message,
            data: {
                doc
            }
        })

        next(err);
    }
};


// Get a task
exports.getTask = async function(req, res, next) {
    try {
        const id = req.params.id;

        const doc = await taskModel.findById(id);


        res.status(200).json({
            status: 'success',
            data: {
                doc
            }
        });

    } catch (err) {
        res.status(500).json({
            status: 'failure',
            message: err.message,
            data: {
                doc
            }
        })

        next(err);
    }
};


// Get all tasks
exports.getAllTasks = async function(req, res) {

    console.log(req.io);
    try {
        const list_id = req.params.list_id;
        let listData = {
            id: list_id,
            name: ""
        };

        const listDoc = await listModel.find({ list_id: list_id }, function(err, data) {
            if (data.length > 0) {
                listData.name = data[0].name;
            }  
        });

        const doc = await taskModel.find({ list_id: list_id }, function(err, data) {

            res.render('task-view', { "tasks": data, "listData": listData });
        });

    } catch (err) {
        console.log("Error getting all tasks for list " + ": " + err);
    }
};

// Create and save a task
exports.createTaskNew = async function(taskData) {

    const list_id = taskData.list_id;

    try {
        const data = {
            name: taskData.name,
            completed: false,
            list_id: list_id
        };

        console.log("final task data to add is");
        console.log(data);

        const doc = await taskModel.create(data);

    } catch (err) {
        console.log("Error creating task: " + err);
    }
};

// Create and save a task
exports.createTaskNew2 = async function(req, res) {

    const list_id = req.body.list_id;

    try {
        const data = {
            name: req.body.name,
            completed: false,
            list_id: list_id
        };

        console.log("creating task (in controller)");
        console.log(data);

        const doc = await taskModel.create(data);

    } catch (err) {
        console.log("Error creating task: " + err);
    }
};


exports.getAllTasksNew = function(listId) {
    try {
        let listData = {
            id: listId,
            name: ""
        };

        const listDoc = listModel.find({ list_id: listId }, function(err, data) {
            if (data.length > 0) {
                listData.name = data[0].name;
            }  
        });

        const doc = taskModel.find({ list_id: listData }, function(err, data) {

            res.render('task-view', { "tasks": data, "listData": listData });
        });

    } catch (err) {
        console.log("Error getting all tasks for list " + ": " + err);
    }
};
