const paths = require('../../paths');
const express = require('express');
const internalRoutes = require('./internals');
const settingsJs = require('./settingsJs');
const indexRoute = require('./indexPath');
const loginRoutes = require('./login');
const apiProxy = require('./apiProxy');

const app = express.Router();

const getConfiguredRouter = (tokenXClient, tokenXIssuer, html) => {
    loginRoutes(app);
    internalRoutes(app);
    settingsJs(app);
    indexRoute(app);
    // app.use(ensureAuthenticated);
    apiProxy(app, tokenXClient, tokenXIssuer);
    app.get(`${paths.basePath}/*`, (req, res) => {
        res.send(html);
    });

    return app;
};

module.exports = { getConfiguredRouter };
