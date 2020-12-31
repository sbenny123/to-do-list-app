/**
 * The main application file:
 *  - Sets up application with settings and middleware
 *  - Handles application errors
 */

const express = require('express');


const listRouter = require('./routes/list.routes');
const taskRouter = require('./routes/task.routes');
const userRouter = require('./routes/user.routes');

//const bodyParser = require('body-parser');

//const PORT = (process.env.PORT || 3000);
const app = express();

//require('./config/static-files')(express, app);

// 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

/*// Used to handle reading data from <form> element
app.use(bodyParser.urlencoded({ extended : true }));


app.get('/', (request, response) => {
    // Show temporary index file for now
    response.sendFile(__dirname + '/index.html');  
});

app.listen(PORT, function() {   
    console.log("Server is running on port " + PORT)
});*/

module.exports = app;