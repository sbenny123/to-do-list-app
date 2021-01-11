/**
 * Tests for task controller, route and CRUD functionality
 */

// Module dependencies
const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');

const app = require('../../app');
const data = require('../data/tasks.json');

chai.use(chaiHttp);


describe('Task integration tests', function() {

    // Test for getting all tasks for a fake list  
    it("Should get all tasks", function(done) {
        chai.request(app)
            .get('/tasks/1234')
            .end((err, res) => {
                should.not.exist(err);
                res.status.should.equal(200);
            })

          done()
    })
})