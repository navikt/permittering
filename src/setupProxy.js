const internalRoutes = require("./server/routes/internals");
const apiMockRoutes = require("./server/routes/apiMock");
const apiProxyRoutes = require("./server/routes/apiProxy");
module.exports = function(app) {
  internalRoutes(app);
  apiProxyRoutes(app);
  //apiMockRoutes(app);
};
