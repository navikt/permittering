const storageClient = require('./StorageMock');
const assert = require('assert');
describe('StorageMock Tests', function () {
    it('should return nothing when initialized', function () {
        const res = storageClient.getObject('x');
        assert.strictEqual(res, undefined);
    });

    it('should not return empty array', function () {
        const res = storageClient.listObjects();
        assert.equal(res.length, 0);
    });

    it('should be able to put an object', function () {
        const res = storageClient.putObject('x', {});
        assert.equal(res.id, 'x');
    });

    it('should be able to delete object', function () {
        storageClient.putObject('x', {});
        storageClient.deleteObject('x');
        const res = storageClient.getObject('x');
        assert.strictEqual(res, undefined);
    });
});
