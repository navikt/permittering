const apiMockRoutes = require('./server/routes/apiMock');
const apiProxyRoutes = require('./server/routes/apiProxy');
const featureToggles = require('./server/routes/featureToggleMock');
const internalRoutes = require('./server/routes/internals');
const loginRoutes = require('./server/routes/login');
const settingsJs = require('./server/routes/settingsJs');
const stillingstitlerMock = require('./server/routes/stillingstitlerMock');
/**
 * Dette er configen som `craco start` bruker...
 * @param app
 */
module.exports = function(app) {
    internalRoutes(app);
    loginRoutes(app);
    featureToggles(app);
    settingsJs(app);
    stillingstitlerMock(app);
    if (process.env.REACT_APP_MOCK) {
        apiMockRoutes(app);
    } else {
        apiProxyRoutes(app);
    }
};
