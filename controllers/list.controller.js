/**
 * CRUD functions for lists
 */

const listModel = require('../models/list.model');
const idUtils = require('../utils/id'); // for generating list id
const modelConfig = require('../config/models.config');


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


// Create and save a list and re-update view using socket.io
exports.createList = async function(listData) {
    const socketApi = require('../config/socket.config'); // for emitting 'get lists'

    try {
        const list_id = idUtils.generateId(modelConfig.LIST_ID_LENGTH);
        const user_id = listData.user_id || "";

        const data = {
            list_id: list_id,
            name: listData.name,
            user_id: user_id
        };

        // Create list and make calls to re-update list view if the data is valid
        if (isValidInput(data)) {
            const listDoc = await listModel.create(data);
            socketApi.getLists(user_id);
        }

    } catch (err) {
        console.log("Error creating list: " + err);
    }
};


// Update a list and get updated view
exports.updateList = async function(listData) {
    const socketApi = require('../config/socket.config'); // for emitting 'get lists'

    try {
        const id = listData.listId;
        const userId = listData.userId;

        const data = {
            list_id: id,
            user_id: userId,
            name: listData.listName
        };

        const taskDoc = await taskModel.findByIdAndUpdate(id, data, {
            new: true, // updated data is returned to function
            runValidators: true
        });
        socketApi.getLists(userId);

    } catch (err) {
        console.log("Error updating list: " + err);
    }
};


// Delete a list and reupdate view using socket.io
exports.deleteList = async function(listData) {
    const socketApi = require('../config/socket.config'); // for emitting 'get lists'

    try {
        const listId = listData.listId || null;
        const userId = listData.userId || null;

        if (listId !== null) {
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
        let listDocs = () => ( listModel.find({ user_id: userId }).exec() );

        return await listDocs();

    } catch (err) {
        console.log("Error getting all lists: " + err);
    }
};


// Get all lists for user
// This is used by the '/lists' route - doesn't use socket.io
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
        res.render('500', { error: err });
    }
};
