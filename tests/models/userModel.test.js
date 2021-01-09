var mongoose = require('mongoose');
var should = require('should');

var userModel = require('../../models/user.model');
var db;

describe('User model tests', function() {

/*before(function(done) {
 db = mongoose.connect("mongodb+srv://dbUser:day-planner-123@day-planner-organiser.qn0yz.mongodb.net/test_db?retryWrites=true&w=majority");
   done();
 });

 after(function(done) {
   mongoose.connection.close()
   done();
 });

 beforeEach(function(done) {
  var user = new userModel({
    user_id: '123456',
    fullName: 'Testy McTesty',
    username: 'testy123@email.com',
    password: 'testy123'
  });

  user.save(function(error) {
    if (error) console.log('error' + error.message);
    else console.log('no error');
    done();
   });
 });

 it('find a user by email', function(done) {
    userModel.findOne({ username: 'testy123@email.com' }, function(err, user) {
        console.log(user);
      user.username.should.eql('testy123@email.com');
      console.log("   username: ", user.username)
      done();
    });
 });

 afterEach(function(done) {
    userModel.deleteOne({ username: 'testy123@email.com' }, function() {
      done();
    });
 });*/

});