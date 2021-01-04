const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    name: {
        type: String
    }
}, {
    collection: 'tasks'
});

module.exports = mongoose.model("Task", taskSchema);