/**
 * CRUD functions for users
 */

const userModel = require('../models/user.model');
const idUtils = require('../utils/id');


exports.register = function(req, res) {
    try {
        const user_id = idUtils.generateId(6);
        const data = {
            user_id: user_id,
            fullName: req.body.fullName,
            email: req.body.email,
            hashed_password: req.body.password
        };

        // Create and save user to database
        const newUser = await data.create(data);

        res.json({ error: null, data: savedUser });
    
    } catch (err) {
        res.status(400).json({ error });
    }
};


exports.logIn = function(req, res) {

};


exports.showUserProfile = function(req, res) {

};

// Create and save a user
exports.createUser = async function(req, res, next) {
    try {
        const data = {
            email: req.body.email,
            password: req.body.password
        };

        const doc = await userModel.create(data);


        res.status(201).json({
            status: 'success',
            data: {
                doc
            }
        });

        res.redirect("/");

    } catch (err) {
        res.status(500).json({
            status: 'failure',
            message: err.message,
            data: {
                doc
            }
        })

        next(err);

        res.redirect("/");
    }
};


// Update a user
exports.updateUser = async function(req, res, next) {
    try {
        const id = req.params.id;
        const data = {
            
        };

        const doc = await userModel.findByIdAndUpdate(id, data, {
            new: true, // updated data is returned to function
            runValidators: true
        });


        res.status(200).json({
            status: 'success',
            data: {
                doc
            }
        });

    } catch (err) {
        res.status(500).json({
            status: 'failure',
            message: err.message,
            data: {
                doc
            }
        })

        next(err);
    }
};


// Delete a user
exports.deleteUser = async function(req, res, next) {
    try {
        const id = req.params.id;

        const doc = await userModel.findByIdAndDelete(id);


        res.status(204).json({
            status: 'success',
            data: null
        });

    } catch (err) {
        res.status(500).json({
            status: 'failure',
            message: err.message,
            data: {
                doc
            }
        })

        next(err);
    }
};


// Get a user
exports.getUser = async function(req, res, next) {
    try {
        const id = req.params.id;

        const doc = await userModel.findById(id);


        res.status(200).json({
            status: 'success',
            data: {
                doc
            }
        });

    } catch (err) {
        res.status(500).json({
            status: 'failure',
            message: err.message,
            data: {
                doc
            }
        })

        next(err);
    }
};


// Get all users
exports.getAllUsers = async function(req, res, next) {
    try {
        const doc = await userModel.find();

        res.status(200).json({
            status: 'success',
            results: doc.length,
            data: {
                data: doc
            }
        });

    } catch (err) {
        res.status(500).json({
            status: 'failure',
            message: err.message,
            data: {
                doc
            }
        })

        next(err);
    }
};
