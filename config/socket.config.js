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

    socket.on("create task", function(data) {
        console.log("New task to add");

        //taskController.createTaskNew(data);

        io.emit('create task', data);


       // taskController.createTaskNew(task);

       // socketApi.getAllTasks(task); // Emits to all connected clients
    });
});


module.exports = socketApi;