const internalRoutes = require("./server/routes/internals");
const apiMockRoutes = require("./server/routes/apiMock");
const apiProxyRoutes = require("./server/routes/apiProxy");
module.exports = function(app) {
  internalRoutes(app);
  if (process.env.REACT_APP_MOCK) {
    apiMockRoutes(app);
  } else {
    apiProxyRoutes(app);
  }
};
