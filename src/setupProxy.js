const internalRoutes = require("./server/routes/internals");
const apiMockRoutes = require("./server/routes/apiMock");
const apiProxyRoutes = require("./server/routes/apiProxy");
const loginRoutes = require("./server/routes/login");
module.exports = function(app) {
  internalRoutes(app);
  loginRoutes(app);
  if (process.env.REACT_APP_MOCK) {
    apiMockRoutes(app);
  } else {
    apiProxyRoutes(app);
  }
};
