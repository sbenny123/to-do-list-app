/**
 * Tests for list controller, route and CRUD functionality
 */

// Module dependencies
const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');

const app = require('../../app');
const data = require('../data/lists.json');

chai.use(chaiHttp);


describe('List integration tests', function() {

    // Test for getting all lists    
    it("Should get all lists", function(done) {
        chai.request(app)
            .get('/lists')
            .end((err, res) => {
                should.not.exist(err);
                res.status.should.equal(200);
            })

          done()
    })
})