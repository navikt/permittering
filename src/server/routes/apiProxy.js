const paths = require('../../paths');
const proxy = require('express-http-proxy');
const { BACKEND_BASEURL, BACKEND_API_PATH } = require('../konstanter');
const { exchangeToken, ensureAuthenticated } = require('../tokenUtils');

const apiProxy = (app, tokenXClient, tokenXIssuer) => {
    app.use(
        paths.apiPath,
        ensureAuthenticated,
        proxy(`${BACKEND_BASEURL}`, {
            proxyReqPathResolver: req => {
                return `${BACKEND_API_PATH}${req.url}`;
            },
            proxyReqOptDecorator: (options, req) => {
                console.log('Proxy for api request');
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

module.exports = apiProxy;
