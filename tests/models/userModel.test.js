const expect = require('chai').expect;
const should = require('should');

const data = require('../data/users.json');
const userModel = require('../../models/user.model');


describe('User model tests', function() {

    it('Should be invalid if email is empty', function(done) {
        var user = new userModel();

        user.validate(function(err) {
            expect(err.errors.username).to.exist;
            done();
        })
    })

})