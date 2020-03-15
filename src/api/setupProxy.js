const proxy = require('http-proxy-middleware');
const whitelist = require('./whitelist');

const brukLokalLogin = process.env.NODE_ENV === 'development' || process.env.REACT_APP_ON_HEROKU === 'true';

const envProperties = {
    APIGW_URL: process.env.APIGW_URL || 'http://localhost:8080',
    APIGW_HEADER: process.env.APIGW_HEADER,
    ISSO_LOGIN_URL:
        process.env.ISSO_LOGIN_URL ||
        (brukLokalLogin &&
            '/permittering/api/local/isso-login?redirect=http://localhost:3000/permittering'),
    SELVBETJENING_LOGIN_URL:
        process.env.SELVBETJENING_LOGIN_URL ||
        (brukLokalLogin &&
            '/permittering/api/local/selvbetjening-login?redirect=http://localhost:3000/permittering'),
    LOGOUT_URL:
        process.env.LOGOUT_URL ||
        (brukLokalLogin &&
            '/permittering/api/local/logout?redirect=http://localhost:3000/permittering'),
};

if (!envProperties.LOGOUT_URL || !(envProperties.ISSO_LOGIN_URL || envProperties.SELVBETJENING_LOGIN_URL)) {
    console.error(
        'Må sette en variabel for innlogging og en for utlogging: LOGOUT_URL, SELVBETJENING_LOGIN_URL, ISSO_LOGIN_URL.'
    );
    process.exit(1);
}

const proxyConfig = {
        changeOrigin: true,
        pathRewrite: whitelist,
        target: envProperties.APIGW_URL,
        xfwd: true,
    };

    if (envProperties.APIGW_HEADER) {
        proxyConfig.headers = {
            'x-nav-apiKey': envProperties.APIGW_HEADER,
        };
    }

    app.use('/permittering/api', proxy(proxyConfig));
