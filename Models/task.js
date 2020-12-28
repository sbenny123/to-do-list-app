const mongoose = require("mongoose");


const taskSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String
});