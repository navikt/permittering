const paths = require('../../paths');
const passport = require('passport');
const express = require('express');
const proxy = require('express-http-proxy');
const createEnvSettingsFile = require('../envSettings.js');
const { exchangeToken, ensureAuthenticated } = require('../tokenUtils');
const path = require('path');
const buildPath = path.join(__dirname, '../../../build');
const { BACKEND_BASEURL, BACKEND_API_PATH } = require('../konstanter');

const app = express.Router();

const getConfiguredRouter = (tokenXClient, tokenXIssuer, html) => {
    app.get(
        paths.redirectTilLoginPath,
        passport.authenticate('idPortenOIDC', {
            successRedirect: `/success`,
            failureRedirect: `/login`,
        })
    );

    app.use(
        '/permittering/oauth2/callback',
        passport.authenticate('idPortenOIDC', { failureRedirect: paths.basePath }),
        (req, res) => {
            // Ref nais example app that sets id_token in a non http only session
            // flaakjahsdf localhost-idtoken
            res.cookie('permittering-token', `${req.user.tokenSets.self.id_token}`, {
                secure: false,
                sameSite: 'lax',
                maxAge: 3600 * 1000,
            });
            res.redirect('/permittering');
        }
    );

    app.get(paths.isAlivePath, (req, res) => res.sendStatus(200));
    app.get(paths.isReadyPath, (req, res) => res.sendStatus(200));

    app.get(paths.settingsJsPath, (req, res) => {
        res.contentType('text/javascript');
        res.send(createEnvSettingsFile());
    });

    app.use(paths.basePath, express.static(buildPath, { index: false }));
    app.get('/', (req, res) => {
        res.redirect(301, paths.basePath);
    });

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
