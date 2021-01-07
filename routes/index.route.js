// Module dependencies
const express = require('express');

const router = express.Router(); // Express Router object

// GET home page
router.get('/', function(req, res, next) {
    res.render('home');
});

module.exports = router;