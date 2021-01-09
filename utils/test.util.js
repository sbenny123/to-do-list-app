const prepare = require('mocha-prepare');
const mongoUnit = require('mocha-unit');

prepare(done => mongoUnit.start()
.then(testMongoUrl => {
    process.env.MONGO_URL = process.env.MONGO_DEV_URI;
    done()
  }));