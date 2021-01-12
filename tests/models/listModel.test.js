/**
 * 
 */

const expect = require('chai').expect;

//const dotenv = require('dotenv');
//const mongoose = require('mongoose');

//dotenv.config();
//const connectionString = process.env.MONGO_DEV_URI || ""; // MongoDb Connection Uri 

const data = require('../data/lists.json');
const listModel = require('../../models/list.model');


describe('List model tests', function() {

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


    it('Should be invalid if name, list_id or user_id are empty', function(done) {
        var list = new listModel();

        list.validate(function(err) {
            expect(err.errors.list_id).to.exist;
            expect(err.errors.name).to.exist;
            expect(err.errors.user_id).to.exist;
            done();
        });
    });


   /* it('Should be invalid if list_id is not unique', function(done) {
        var testData = data.failure.model.unique;

        listModel.create([testData, testData], function(err) {
            expect(err).to.exist;
            expect(err.code).to.equal(11000);
            done();
        });
    });*/
})