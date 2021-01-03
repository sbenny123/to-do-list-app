const express = require('express');
const app = express();

const listRoute = express.Router();

let listSchema = require('../models/list.model');

listRoute.route('/').get((request, response) => {
    listSchema.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            response.json(data)
        }
    })
});

// Create a list
listRoute.route('/create-list').post((request, response, next) => {
    listSchema.create(request.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            response.json(data)
        }
    })
})
