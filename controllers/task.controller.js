/**
 * CRUD functions for tasks
 */

const taskModel = require('../models/task.model');
const listModel = require('../models/list.model');


/**
 * Validates data before calling Mongoose create function
 * @param {object} data 
 */
function isValidInput(data) {
    let name = data.name || undefined;
    let completed = data.completed || false;
    let list_id = data.list_id || undefined;

    if ((name && typeof(name) == "string") &&
        (list_id && typeof(list_id) == "string")
        ) {
            return true;
        }

        return false;
}


// Create and save a task and re-update the view using socket.io
exports.createTask = async function(taskData) {
    try {
        const socketApi = require('../config/socket.config'); // for emitting 'get tasks'
        const list_id = taskData.list_id || null;

        const data = {
            name: taskData.name || null,
            completed: false,
            list_id: list_id
        };

        // Create task if valid and make calls to re-update task view
        if (isValidInput(data)) {
            const taskDoc = await taskModel.create(data);
            socketApi.getTasks(list_id);
        }

    } catch (err) {
        console.log("Error creating task: " + err);
    }
};


// Update a task
exports.updateTask = async function(taskData) {
    const socketApi = require('../config/socket.config'); // for emitting 'get tasks'

    try {
        const id = taskData.taskId;
        const list_id = taskData.listId;
        const data = {};

        // Depending on the data to update, the other one is removed
        // E.g. when checkbox is ticket, name is not included with request params
        if (taskData.name !== undefined) {
            data.name = taskData.name;
        }
        if (taskData.completed !== undefined) {
            data.completed = taskData.completed;
        }

        const taskDoc = await taskModel.findByIdAndUpdate(id, data, {
            new: true, // updated data is returned to function
            runValidators: true
        });
        socketApi.getTasks(list_id);

    } catch (err) {
        console.log("Error updating task: " + err);
    }
};


// Delete a task and re-update the view using socket.io
exports.deleteTask = async function(taskData) {
    const socketApi = require('../config/socket.config'); // for emitting 'get tasks'

    try {
        const taskId = taskData.taskId || null;
        const listId = taskData.listId || null;

        if (taskId !== null) {
            console.log("deleting task");

            const taskDoc = await taskModel.findByIdAndDelete(taskId);
            socketApi.getTasks(listId);
        }

    } catch (err) {
        console.log("Error deleting task: " + err);
    }
};


// Get all tasks for list
exports.getTasksRoute = async function(req, res) {
    try {
        const list_id = req.params.list_id || null;
        let listData = {
            id: list_id,
            name: ""
        };

        if (list_id !== null) {
            const listDoc = await listModel.find({ list_id: list_id }, function(err, data) {
                if (Array.isArray(data) && data.length > 0) {
                    listData.name = data[0].name || "";
                }  
            });
    
            const taskDocs = await taskModel.find({ list_id: list_id }, function(err, data) {
                if (Array.isArray(data) && data.length > 0) {
                    res.render('task-view', { "tasks": data, "listData": listData });
                } else {
                    res.render('task-view', { "tasks": [], "listData": listData });
                }
            });

        } else {
            res.render('500', { error: "Could not get tasks" });
        }
        
    } catch (err) {
        console.log("Error getting all tasks for list: " + err);
        res.render('500', { error: err });
    }
};


// Get all tasks for list using listId
// Makes calls to get list data (showing list name) as well as getting tasks
exports.getTasksSocket = async function(listId) {
    try {
        let listData = {
            id: listId || null,
            name: ""
        };

        if (listId !== null) {
            const listDoc = listModel.find({ list_id: listId }, function(err, data) {
                if (Array.isArray(data) && data.length > 0) {
                    listData.name = data[0].name;
                }
            });
    
            const taskDocs = taskModel.find({ list_id: listId }, function(err, data) {
                let result = {
                    tasks: [],
                    listData: listData
                };

                if (Array.isArray(data) && data.length > 0) {
                    result.tasks = data;
                }

                return result;
            });
    
            let [list, tasks] = await Promise.all([listDoc, taskDocs]);

            return tasks;
        }

        return {};
        
    } catch (err) {
        console.log("Error getting all tasks for list: " + err);
    }
};
