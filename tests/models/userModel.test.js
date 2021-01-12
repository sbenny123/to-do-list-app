
const expect = require('chai').expect;

//const dotenv = require('dotenv');
//const mongoose = require('mongoose');

//dotenv.config();
//const connectionString = process.env.MONGO_DEV_URI || ""; // MongoDb Connection Uri 

const data = require('../data/users.json');
const userModel = require('../../models/user.model');


describe('User model tests', function() {
  
 /* before(function (done) {
    this.timeout(6000);

    mongoose.connect(connectionString, {
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function() {
      console.log('We are connected to test database!');
      done();
    });
  });*/


  it('Should be invalid if user_id, fullName or username are empty', function(done) {
    var user = new userModel();

    user.validate(function(err) {
        expect(err.errors.user_id).to.exist;
        expect(err.errors.fullName).to.exist;
        expect(err.errors.username).to.exist;
        done();
    });
  });


  /*it('Should be invalid if user_id is not unique', function(done) {
    var testData = data.failure.model.unique;

    userModel.create([testData, testData], function(err) {
        expect(err).to.exist;
        expect(err.code).to.equal(11000);
        done();
    });
  });*/
});