const paths = require('../../paths');
const proxy = require('express-http-proxy');
const { BACKEND_BASEURL, BACKEND_API_PATH } = require('../konstanter');

module.exports = app => {
    app.use(
        paths.apiPath,
        proxy(`${BACKEND_BASEURL}`, {
            proxyReqPathResolver: req => {
                console.log('resolver proxy path', req.url);
                return `${BACKEND_API_PATH}${req.url}`;
            },
        })
    );
};
