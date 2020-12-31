/**
 * The main application file:
 *  - Handles application errors
 *  - Used in showing error pages and logging
 */

const express = require('express');
//const bodyParser = require('body-parser');

//const PORT = (process.env.PORT || 3000);
let app = express();

require('./config/static-files')(express, app);

/*app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Used to handle reading data from <form> element
app.use(bodyParser.urlencoded({ extended : true }));


app.get('/', (request, response) => {
    // Show temporary index file for now
    response.sendFile(__dirname + '/index.html');  
});

app.listen(PORT, function() {   
    console.log("Server is running on port " + PORT)
});*/

module.exports = app;