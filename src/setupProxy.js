const internalRoutes = require('./server/routes/internals');
const mellomLagringRoutes = require('./server/routes/mellomlagring');
const storageClientMock = require('./server/StorageMock');
module.exports = function(app) {
  internalRoutes(app);
  mellomLagringRoutes(app, storageClientMock);
};
