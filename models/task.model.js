const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required"], 
    },
    completed: {
        type: Boolean,
        required: [true, "completed is required"],
    },
    list_id: {
        type: String,
        required: [true, "list_id is required"],
    }
});

module.exports = mongoose.model("Task", taskSchema);