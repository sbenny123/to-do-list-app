const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    },
    list_id: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Task", taskSchema);