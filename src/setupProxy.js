const internalRoutes = require('./server/routes/internals');
const apiMockRoutes = require('./server/routes/apiMock');
module.exports = function(app) {
  internalRoutes(app);
  apiMockRoutes(app);
};
