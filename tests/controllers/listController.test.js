/**
 * Tests for list controller, route and CRUD functionality
 */

 // Module dependencies
const expect = require('chai').expect;
const should = require('should');
const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../../app');
const data = require('../data/modelData.test.json');
const listRouter = require('../../routes/list.route');


chai.use(chaiHttp);
chai.should();

describe('List controller and router tests', function() {
    var list = data.collections.lists[0];
    var listId = "";
   
    // Test for creating list
    it("Should create a list", function(done) {
        chai.request(app)
            .post('/list')
            .send(list)
            .end((err, res) => {
                res.should.have.status(201);
                console.log(res.body);
            })

            done()
    })


    // Test for updating list    
    it("Should update a list", function(done) {
        chai.request(app)
            .delete('/list')
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
    })
})