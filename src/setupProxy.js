const apiMockRoutes = require('./server/routes/apiMock');
const apiMockProxyRoutes = require('./server/routes/apiMockProxy');
const featureToggles = require('./server/routes/featureToggleMock');
const internalRoutes = require('./server/routes/internals');
const mockLoginRoutes = require('./server/routes/mockLoginRoutes');
const settingsJs = require('./server/routes/settingsJs');
const stillingstitlerMock = require('./server/routes/stillingstitlerMock');
/**
 * Dette er configen som `craco start` bruker...
 * @param app
 */
module.exports = function (app) {
    internalRoutes(app);
    mockLoginRoutes(app);
    featureToggles(app);
    settingsJs(app);
    stillingstitlerMock(app);
    if (process.env.REACT_APP_MOCK) {
        apiMockRoutes(app);
    } else {
        apiMockProxyRoutes(app);
    }
};
