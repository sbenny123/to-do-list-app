const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        lowercase: true
    },
    password: {
        type: String
    }
}, {
    collection: 'users'
});

module.exports = mongoose.model("User", userSchema);