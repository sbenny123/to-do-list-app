const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        lowercase: true
    },
    password: String
});