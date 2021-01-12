
const expect = require('chai').expect;

const data = require('../data/users.json');
const userModel = require('../../models/user.model');


describe('User model tests', function() {
  
  it('Should be invalid if user_id, fullName or username are empty', function(done) {
    var user = new userModel();

    user.validate(function(err) {
        expect(err.errors.user_id).to.exist;
        expect(err.errors.fullName).to.exist;
        expect(err.errors.username).to.exist;
        done();
    });
  });

});