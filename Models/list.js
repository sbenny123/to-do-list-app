const mongoose = require("mongoose");


const listSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String
});