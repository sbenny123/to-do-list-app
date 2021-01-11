
// Module dependencies
const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');

const data = require('../data/tasks.json');
const taskController = require('../../controllers/task.controller');

chai.use(chaiHttp);


describe('Task controller tests', function() {

})