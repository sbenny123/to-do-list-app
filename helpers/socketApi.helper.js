const socket = require('socket.io');
const io = socket();

let socketApi = {
    io: io
};

io.on('connection', function(socket){
    console.log("A user has connected to the socket!");
    socketApi.sendNotification();
});

socketApi.sendNotification = function() {
    io.sockets.emit('hello', {msg: 'Hello World!'});
}


module.exports = socketApi;