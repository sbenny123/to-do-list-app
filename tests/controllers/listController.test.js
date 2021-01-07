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
const data = require('../data/modelData.test.json');
const listRouter = require('../../routes/list.route');
const listModel = require('../../models/list.model');

chai.use(chaiHttp);


describe('List controller and router tests', function() {
    var list = data.collections.lists[0];
    var listId = "";
  
    // Test for creating list
    /*it("Should create a list", function(done) {
        chai.request(app)
            .post('/lists/')
            .send(list)
            .end((err, res) => {
                const data = res.body.data.doc;

                expect(res.status).to.equal(201);
                //expect(data).to.have.property("_id");
               // expect(data).to.have.property("name", "My test list name");
            })

            done()
    })*/


    /*// Test for updating list    
    it("Should update a list", function(done) {
        chai.request(app)
            .put('/lists')
            .send(list)
            .end((err, res) => {
                res.should.have.status(201);
                console.log(res.body);
            })

          done()
    })

    // Test for getting a list    
    it("Should get a list", function(done) {
        chai.request(app)
            .get('/list/' + listId)
            .end((err, res) => {
                res.should.have.status(201);
                console.log(res.body);
            })

          done()
    })

    // Test for getting all lists    
    it("Should get all lists", function(done) {
        chai.request(app)
            .get('/lists')
            .end((err, res) => {
                res.should.have.status(201);
                console.log(res.body);
            })

          done()
    })

    // Test for deleting a list  
    it("Should delete a list", function(done) {
        chai.request(app)
            .post('/list')
            .send(list)
            .end((err, res) => {
                res.should.have.status(201);
                console.log(res.body);
            })

          done()
    })*/
})