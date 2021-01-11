/**
 * CRUD functions for lists
 */

const listModel = require('../models/list.model');


/**
 * Validates data before calling Mongoose create function
 * @param {object} data 
 */
function isValidInput(data) {
    let name = data.name || undefined;
    let list_id = data.list_id || undefined;
    let user_id = data.user_id || undefined;

    if ((name && typeof(name) == "string") &&
        (list_id && typeof(list_id) == "string") &&
        (user_id && typeof(user_id) == "string")) {
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
    const idUtils = require('../utils/id');
    const socketApi = require('../config/socket.config');

    try {
        const list_id = idUtils.generateId(5);
        const user_id = listData.user_id || "";

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
/*exports.deleteList = function(req, res) {
    try {
        const id = req.params.id;

        listModel.findByIdAndDelete(id);

        res.redirect("/lists");


    } catch (err) {
        console.log("Error deleting list: " + err);
        res.redirect("/lists");
    }
};*/

// Delete a list
exports.deleteList = async function(listData) {
    const socketApi = require('../config/socket.config');

    try {
        const listId = listData.listId || null;
        const userId = listData.userId || null;

        if (listId !== null) {
            console.log("deleting task");

            const taskDoc = await listModel.deleteOne({ list_id: listId });
            socketApi.getLists(userId);
        }

    } catch (err) {
        console.log("Error deleting task: " + err);
    }
};


// Get all lists for user using their user id
exports.getListsSocket = async function(userId) {
    try {
        let lists = [];

        if (userId !== null) {
            const listDocs = await listModel.find({ user_id: userId }, function(err, data) {
                if (Array.isArray(data) && data.length > 0) {
                    lists = data;
                }
            });

            return lists;
        } 

        return [];

    } catch (err) {
        console.log("Error getting all lists: " + err);
    }
};

// Get all lists for user
exports.getListsRoute = function(req, res) {
    try {
        let user_id = "";

        if (req.user && req.user.user_id && req.user.user_id !== null) {
            user_id = req.user.user_id;

            listModel.find({ user_id: user_id }, function(err, data) {
                if (Array.isArray(data) && data.length > 0) {
                    res.render('list-view', { "lists": data, "user_id": user_id });
                } else {
                    res.render('list-view', { "lists": [], "user_id": user_id });
                }
            });

        } else {
            res.redirect('/login');
        }
        
    } catch (err) {
        console.log("Error getting all lists: " + err);
        res.render('error');
    }
};
