const expect = require('chai').expect;
const should = require('should');

const data = require('../data/tasks.json');
const taskModel = require('../../models/task.model');


describe('Task model tests', function() {

    it('Should be invalid if name is empty', function(done) {
        var task = new taskModel();

        task.validate(function(err) {
            expect(err.errors.name).to.exist;
            done();
        })
    })

})