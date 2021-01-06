/**
 * CRUD functions for lists
 */

const listModel = require('../models/list.model');


// Create and save a list
exports.createList = async function(req, res, next) {
    try {
        const data = {
            name: req.body.name
        };

        const doc = await listModel.create(data);


        res.status(201).json({
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


// Update a list
exports.updateList = async function(req, res, next) {
    try {
        const id = req.params.id;
        const data = {
            name: req.body.name
        };

        const doc = await listModel.findByIdAndUpdate(id, data, {
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


// Delete a list
exports.deleteList = async function(req, res, next) {
    try {
        const id = req.params.id;

        const doc = await listModel.findByIdAndDelete(id);


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


// Get a list
exports.getList = async function(req, res, next) {
    try {
        const id = req.params.id;

        const doc = await listModel.findById(id);


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


// Get all lists
exports.getAllLists = async function(req, res, next) {
    try {
        const doc = await listModel.find();

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
