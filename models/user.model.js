const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');


const userSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }
});


// Encrypts and stores password before creating new user
userSchema.pre('save', function (next) {
    let user = this;
    
    // Check if password is available and modified
    if (user.isModified('password')) {

        // Hash password
        bcrypt.genSalt(10, function(err, salt) {
            if (err) return next(err)

            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) return next(err)
                user.password = hash; // hashed password is what is stored in database
                next();
            });
        });

    } else {
        next();
    }
});


/**
 * Compare entered password with hashed password - used during login
 * @param {String} enteredPassword 
 * @param {*} callBack 
 */
userSchema.methods.comparePassword = function (enteredPassword, callBack) {
    return bcrypt.compare(enteredPassword, this.password, function(err, isMatch) {
        if (err) return callBack(err);
        callBack(null, isMatch)
    });
};

module.exports = mongoose.model("User", userSchema);