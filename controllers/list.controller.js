/**
 * CRUD functions for lists
 */

const listModel = require('../models/list.model');
const idUtils = require('../utils/id.utils');


// Create and save a list
exports.createList = async function(req, res) {
    try {
        const list_id = idUtils.generateId(5);

        const data = {
            list_id: list_id,
            name: req.body.name,
            user_id: req.body.user_id
        };

        const doc = await listModel.create(data);

        res.redirect("/lists");

    } catch (err) {
        console.log("Error creating list: " + err);
        res.redirect("/lists");
    }
};


// Update a list
exports.updateList = async function(req, res) {
    try {
        const id = req.params.id;
        const data = {
            name: req.body.name
        };

        const doc = await listModel.findByIdAndUpdate(id, data, {
            new: true, // updated data is returned to function
            runValidators: true
        });

        res.redirect("/lists");

    } catch (err) {
        console.log("Error creating list: " + err);
        res.redirect("/lists");
    }
};


// Delete a list
exports.deleteList = function(req, res) {
    try {
        const id = req.params.id;

        listModel.findByIdAndDelete(id);

        res.redirect("/lists");


    } catch (err) {
        console.log("Error deleting list: " + err);
        res.redirect("/lists");
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
exports.getAllLists = function(req, res) {
    try {
        listModel.find({}, function(err, data) {
            res.render('list-view', { "lists": data });
        });

    } catch (err) {
        console.log("Error getting all lists: " + err);
    }
};
