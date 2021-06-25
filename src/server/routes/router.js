const paths = require('../../paths');
const { getHtmlWithDecorator } = require('../decorator-utils');
const express = require('express');
const internalRoutes = require('./internals');
const settingsJs = require('./settingsJs');
const indexRoute = require('./indexPath');
const loginRoutes = require('./login');
const apiProxy = require('./apiProxy');
const path = require('path');

const buildPath = path.join(__dirname, '../../../build');
const app = express.Router();

const getConfiguredRouter = (tokenXClient, tokenXIssuer, idPortenEndSession) => {
    loginRoutes(app, idPortenEndSession);
    internalRoutes(app);
    settingsJs(app);
    indexRoute(app);
    apiProxy(app, tokenXClient, tokenXIssuer);

    app.get(`${paths.basePath}/*`, async (req, res) => {
        try {
            res.send(await getHtmlWithDecorator(buildPath + '/index.html'));
        } catch (e) {
            console.error(e);
            console.warn(
                'Kunne ikke hente dekoratør (header/footer). Appen serves uten dekoratør.'
            );
            res.sendFile(buildPath + '/index.html');
        }
    });

    return app;
};

module.exports = { getConfiguredRouter };
