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
const data = require('../data/users.json');

chai.use(chaiHttp);


describe('User authentication integration tests', function() {
    let registeredUser = data.success.integration.logIn;

    it("Should log in", function(done) {
        chai.request(app)
            .post('/login')
            .send(registeredUser)
            .end((err, res) => {
                res.redirects.should.be.length(2);
                should.not.exist(err);
            });

          done()
    });
    
});