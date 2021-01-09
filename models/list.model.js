/**
 * Defines shape of a document (instance of model) within the 'lists' collection
 */

const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    list_id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
});


// Compiles the List model
// Note: Mongoose automatically looks for the plural, lowercased version of the model name
// The model 'List' is for the 'lists' collection in the database 
module.exports = mongoose.model('List', listSchema);