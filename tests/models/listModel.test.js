/**
 * 
 */

 const expect = require('chai').expect;
const should = require('should');

const data = require('../data/modelData.test.json');
const listModel = require('../../models/list.model');

describe('List model tests', function() {

    it('Should be invalid if name is empty', function(done) {
        var list = new listModel();

        list.validate(function(err) {
            expect(err.errors.name).to.exist;
            done();
        })
    })

})