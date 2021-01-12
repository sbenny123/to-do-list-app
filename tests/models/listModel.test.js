
const expect = require('chai').expect;

const data = require('../data/lists.json');
const listModel = require('../../models/list.model');


describe('List model tests', function() {

    it('Should be invalid if name, list_id or user_id are empty', function(done) {
        var list = new listModel();

        list.validate(function(err) {
            expect(err.errors.list_id).to.exist;
            expect(err.errors.name).to.exist;
            expect(err.errors.user_id).to.exist;
            done();
        });
    });

});