
const express = require("express");
const app = express();


app.get('/', (req,res) => {
    res.send("Hello World");  
});

app.listen(process.env.port || 3000, () => console.log("Server running on port " + (process.env.port || 3000)));