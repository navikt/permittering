const storageClient = require('./StorageMock');
const assert = require('assert');
describe('StorageMock Tests', function() {
  it('should return nothing when initialized', function() {
    const res = storageClient.getObject('x', 'y');
    assert.strictEqual(res, undefined);
  });
  it('should not return empty array', function() {
    const res = storageClient.listObjects('x');
    assert.equal(res.length, 0);
  });
  it('should be able to put an object', function() {
    const res = storageClient.putObject('x', 'y', {});
    assert.strictEqual(res, undefined);
    const found = storageClient.getObject('x', 'y');
    assert.equal(found.userId, 'x');
    assert.equal(found.objectId, 'y');
  });
  it('should be able to delete object', function() {
    storageClient.putObject('x', 'y', {});
    storageClient.deleteObject("x","y")
    const res = storageClient.getObject('x', 'y');
    assert.strictEqual(res, undefined);
  });
});
