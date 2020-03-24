const internalRoutes = require('./server/routes/internals');
const apiMockRoutes = require('./server/routes/apiMock');
const apiProxyRoutes = require('./server/routes/apiProxy');
const loginRoutes = require('./server/routes/login');
const featureToggles = require('./server/routes/featureToggleMock');
const stillingstitlerMock = require('./server/routes/stillingstitlerMock');
/**
 * Dette er configen som `craco start` bruker...
 * @param app
 */
module.exports = function(app) {
    internalRoutes(app);
    loginRoutes(app);
    featureToggles(app);
    stillingstitlerMock(app);
    if (process.env.REACT_APP_MOCK) {
        apiMockRoutes(app);
    } else {
        apiProxyRoutes(app);
    }
};
