const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");


const userSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: [true, "user_id is required"],
        unique: [true, "user_id must be unique"]
    },
    fullName: {
        type: String,
        trim: true,
        required: [true, "fullName is required"],
    },
    username: {
        type: String,
        lowercase: true,
        trim: true,
        unique: [true, "username must be unique"],
        required: [true, "username is required"],
    },
    password: {
        type: String,
        minlength: [6, "password is too short"]
    }
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);