/**
 * Socket.io initialisation, calls and associated functions
 * Other parts of the project can use this file to emit calls
 */
const socket = require('socket.io');
let io = socket();

const listController = require('../controllers/list.controller')
const taskController = require('../controllers/task.controller');

let socketApi = {
    io: io
};


io.on('connection', function(socket){
    console.log("Connected to socket");

    socket.on("disconnect", function() {
        console.log("Disconnected from socket")
    });


    /**
     * List socket calls - for creation, deletion and getting latest lists
     */
    socket.on('create list', function(data) {
        listController.createList(data);
    });

    socket.on('delete list', function(data) {
        listController.deleteList(data);
    })

    socket.on('get lists', function(userId) {
        listController.getListsSocket(userId)
        .then(function(result) {
            // Updates html content in list-view with the lists retrieved
            io.emit('show lists', result);
        })
        .catch(function(result) {
            console.log("error getting lists result: " + result);
        });
    })


    /**
     * Task socket calls - for creation, deletion and getting latest tasks
     */
    socket.on('create task', function(data) {
        taskController.createTask(data);
    });

    socket.on('update task', function(data) {
        taskController.updateTask(data);
    })

    socket.on('delete task', function(data) {
        taskController.deleteTask(data);
    })

    socket.on('get tasks', function(listId) {
        taskController.getTasksSocket(listId)
        .then(function(result) {
            // Updates html content in task-view with the tasks retrieved
            io.emit('show tasks', result);
        })
        .catch(function(result) {
            console.log("error getting result: " + result);
        });
    })
});

socketApi.getTasks = function(listId) {
    io.emit('get tasks', listId);
};

socketApi.getLists = function(userId) {
    io.emit('get lists', userId);
};

module.exports = socketApi;