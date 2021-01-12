
const expect = require('chai').expect;

const taskModel = require('../../models/task.model');


describe('Task model tests', function() {

    it('Should be invalid if name is empty', function(done) {
        var task = new taskModel();

        task.validate(function(err) {
            expect(err.errors.name).to.exist;
            expect(err.errors.list_id).to.exist;
            done();
        });
    });

});