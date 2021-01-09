var mongoose = require('mongoose');
var should = require('should');

var userModel = require('../../models/user.model');
var db;

describe('User model tests', function() {

before(function(done) {
 db = mongoose.connect("mongodb+srv://dbUser:day-planner-123@day-planner-organiser.qn0yz.mongodb.net/test_db?retryWrites=true&w=majority");
   done();
 });

 after(function(done) {
   mongoose.connection.close()
   done();
 });

 beforeEach(function(done) {
  var account = new userModel({
    username: 'testy@email.com',
    password: 'testy'
  });

  account.save(function(error) {
    if (error) console.log('error' + error.message);
    else console.log('no error');
    done();
   });
 });

 it('find a user by email', function(done) {
    userModel.findOne({ email: 'testy@email.com' }, function(err, user) {
      user.username.should.eql('testy@email.com');
      console.log("   username: ", user.username)
      done();
    });
 });

 afterEach(function(done) {
    userModel.deleteOne({ username: 'testy@email.com' }, function() {
      done();
    });
 });

});