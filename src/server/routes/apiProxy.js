const paths = require('../../paths');
const proxy = require('express-http-proxy');
const { BACKEND_BASEURL, BACKEND_API_PATH } = require('../konstanter');
const { exchangeToken, ensureAuthenticated } = require('../tokenUtils');
const { resolve } = require('path');

module.exports = (app, tokenXClient, tokenXIssuer) => {
    app.use(
        paths.apiPath,
        ensureAuthenticated,
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
};
