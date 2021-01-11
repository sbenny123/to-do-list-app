/**
 * CRUD functions for lists
 */

const listModel = require('../models/list.model');
const idUtils = require('../utils/id');

function isValidInput(data) {
    let name = data.name || undefined;
    let list_id = data.list_id || undefined;
    let user_id = data.user_id || undefined;

    if ((name && typeof(name) == "string") &&
        (list_id && typeof(list_id) == "string")
        (user_id && typeof(user_id) == "string")
        ) {
            return true;
        }

        return false;
}

// Create and save a list
/*exports.createList = async function(req, res) {
    try {
        const list_id = idUtils.generateId(5);

        const data = {
            list_id: list_id,
            name: req.body.name,
            user_id: req.user.user_id || ""
        };

        const doc = await listModel.create(data);

        res.redirect("/lists");

    } catch (err) {
        console.log("Error creating list: " + err);
        res.redirect("/lists");
    }
};*/

// Create and save a list
exports.createList = async function(listData) {
    try {
        const list_id = idUtils.generateId(5);
        const user_id = req.user.user_id || "";

        const data = {
            list_id: list_id,
            name: listData.name,
            user_id: user_id
        };

        // Create list if valid and make calls to re-update list view
        if (isValidInput(data)) {
            const listDoc = await listModel.create(data);
            socketApi.getLists(user_id);
        }

    } catch (err) {
        console.log("Error creating list: " + err);
        res.render('error', {});
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
/*exports.getList = async function(req, res, next) {
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
};*/

exports.getListsSocket = async function(userId) {
    try {
        if (userId !== null) {
            const listDocs = listModel.find({ user_id: userId }, function(err, data) {
                if (Array.isArray(data) && data.length > 0) {
                    return data;
                }
            });
        }

        return [];

    } catch (err) {
        console.log("Error getting all lists: " + err);
        res.render('error', {});
    }
};

// Get all lists
exports.getAllLists = function(req, res) {
    const user_id = req.user.user_id || "";

    try {
        listModel.find({ user_id: user_id }, function(err, data) {
            res.render('list-view', { "lists": data, "user_id": user_id });
        });

    } catch (err) {
        console.log("Error getting all lists: " + err);
    }
};
