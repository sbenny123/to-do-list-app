const chai = require('chai');
const expect = chai.expect;
const idUtils = require('../../utils/id');

describe('Generate id tests', function() {
  
    it('should generate a random id', function(done) {
        var id1 = idUtils.generateId(5);
        var id2 = idUtils.generateId(5);
     
        expect(id1).to.exist;
        expect(id2).to.exist;
        expect(id1).to.not.equal(id2);
        done();
    });

    
    it('should not generate an id if it is not a number', function(done) {
        var id = idUtils.generateId('s');
     
        expect(id).to.exist;
        expect(id).to.equal("");
        done();
    });
  
  });