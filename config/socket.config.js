const socket = require('socket.io');
let io = socket();

const taskController = require('../controllers/task.controller');

let socketApi = {};
socketApi.io = io;


io.on('connection', function(socket){
    console.log("Connected to socket");

    socket.on("disconnect", function() {
        console.log("Disconnected from socket")
    });

    socket.on('create task', function(data) {
        taskController.createTask(data);
    });

    socket.on('delete task', function(data) {
        taskController.deleteTask(data);
    })

    socket.on('get tasks', function(listId) {
        console.log("getting tasks again");

        taskController.getTasksSocket(listId)
        .then(function(result) {
            io.emit('show tasks', result);
        })
        .catch(function(result) {
            console.log("error getting result: " + result);
        });
    })
});

socketApi.getTasks = function(listId) {
    console.log("emitting get tasks");

    io.emit('get tasks', listId);
};



module.exports = socketApi;