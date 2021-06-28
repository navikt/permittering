const paths = require('../../paths');
const express = require('express');
const apiMockRoutes = require('./apiMock');
const featureToggles = require('./featureToggleMock');
const internalRoutes = require('./internals');
const indexRoute = require('./indexPath');
const settingsJs = require('./settingsJs');
const stillingstitlerMock = require('./stillingstitlerMock');
const path = require('path');

const buildPath = path.join(__dirname, '../../../build');
const app = express.Router();

/**
 *
 * A router returning mock values, but still running a proper node server.
 * To be used in demo environments such as labs-gcp
 */
const getConfiguredMockRouter = () => {
    internalRoutes(app);
    featureToggles(app);
    settingsJs(app);
    stillingstitlerMock(app);
    indexRoute(app);
    apiMockRoutes(app);
    app.get(`${paths.basePath}/*`, (req, res) => {
        res.sendFile(buildPath + '/index.html');
    });
    return app;
};

module.exports = { getConfiguredMockRouter };
