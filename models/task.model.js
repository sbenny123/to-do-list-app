const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    name: String
}, {
    collection: 'tasks'
});

module.exports = mongoose.model("Task", taskSchema);