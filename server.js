// Module dependencies
const http = require('http');
const app = require('./app');
const socketApi = require('./config/socket.config'); // Socket configuration and events
var server;

process.on('uncaughtException', err => {
    console.log("Uncaught exception returned:" + err);
    process.exit(1);
});



// Set port the server should listen to
const port = normalisePort(process.env.PORT || 3000 || 8000);
app.set('port', port);

// Create HTTP server instance
server = http.createServer(app);

// Give socket access to server to listen for events
const io = socketApi.io;
io.attach(server);

// Make server listen to the specified port
server.listen(port);

// Handle errors and success
server.on('error', onError);
server.on('listening', onListening);


/**
 * Normalise a port into a number, string, or false.
 * @param val: Port to check
 */
function normalisePort(val) {
  let port = parseInt(val, 10);

  switch(true) {
    case (isNaN(port)):
    // return named pipe
    return val;

    case (port >= 0):
    // return port number
    return port;
  
    default:
    return false;
  }
}


/**
 * Handles "error" event from HTTP server.
 */
 function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  let bind = typeof port === 'string'? 'Pipe ' + port: 'Port ' + port;

  // Show friendly message depending on the listening error
  switch (error.code) {   
    case 'EACCES':
      console.error(bind + " requires elevated privileges");
      process.exit(1);    
      break;
    
    case 'EADDRINUSE':
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    
    default:
      throw error;
  }
}


/**
 * Handles "listening" event from HTTP server.
 */
function onListening() {
  let address = server.address();
  let bind = typeof address === 'string'? 'pipe ' + address : 'port ' + address.port;

  console.log("Server is listening on " + bind);
}