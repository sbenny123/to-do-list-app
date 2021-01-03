const mongoose = require('mongoose');

const listSchema = mongoose.Schema({
    name: String
}, {
    collection: 'lists'
});

module.exports = mongoose.model('List', listSchema);