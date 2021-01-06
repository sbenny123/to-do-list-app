const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    }
}, {
    collection: 'tasks'
});

module.exports = mongoose.model("Task", taskSchema);