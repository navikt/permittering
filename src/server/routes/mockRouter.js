const paths = require('../../paths');
const express = require('express');
const apiMockRoutes = require('./apiMock');
const apiMockProxyRoutes = require('./apiMockProxy');
const featureToggles = require('./featureToggleMock');
const internalRoutes = require('./internals');
const indexRoute = require('./indexPath');
const mockLoginRoutes = require('./mockLoginRoutes');
const settingsJs = require('./settingsJs');
const stillingstitlerMock = require('./stillingstitlerMock');

const app = express.Router();

/**
 *
 * A router returning mock values. To be used in demo environments such as labs-gcp
 */
const getConfiguredMockRouter = (html) => {
    internalRoutes(app);
    featureToggles(app);
    settingsJs(app);
    stillingstitlerMock(app);
    indexRoute(app);
    apiMockRoutes(app);
    app.get(`${paths.basePath}/*`, (req, res) => {
        res.send(html);
    });
    return app;
};

module.exports = { getConfiguredMockRouter };
