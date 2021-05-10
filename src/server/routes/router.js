const paths = require('../../paths');
const express = require('express');
const proxy = require('express-http-proxy');
const createEnvSettingsFile = require('../envSettings.js');
const { exchangeToken, ensureAuthenticated } = require('../tokenUtils');
const path = require('path');
const buildPath = path.join(__dirname, '../../../build');
const { BACKEND_BASEURL, BACKEND_API_PATH } = require('../konstanter');
const internalRoutes = require('./internals');
const settingsJs = require('./settingsJs');
const indexRoute = require('./indexPath');
const loginRoutes = require('./login');

const app = express.Router();

const getConfiguredRouter = (tokenXClient, tokenXIssuer, html) => {
    loginRoutes(app);
    internalRoutes(app);
    settingsJs(app);
    indexRoute(app);
    // app.use(ensureAuthenticated);
    app.use(
        paths.apiPath,
        proxy(`${BACKEND_BASEURL}`, {
            proxyReqPathResolver: req => {
                return `${BACKEND_API_PATH}${req.url}`;
            },
            proxyReqOptDecorator: (options, req) => {
                return new Promise((resolve, reject) => {
                    exchangeToken(tokenXClient, tokenXIssuer, req).then(
                        access_token => {
                            options.headers.Authorization = `Bearer ${access_token}`;
                            resolve(options);
                        },
                        error => reject(error)
                    );
                });
            },
        })
    );
    app.get(`${paths.basePath}/*`, (req, res) => {
        res.send(html);
    });

    return app;
};

module.exports = { getConfiguredRouter };
