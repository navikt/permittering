const proxy = require('http-proxy-middleware');

const veilarbStatus = () => {
    if (process.env.CLUSTER === 'prod-sbs') {
        return 'https://tjenester.nav.no/';
    } else {
        return 'https://tjenester-q1.nav.no/';
    }
};

const veilarbStatusProxyConfig = {
    changeOrigin: true,
    target: veilarbStatus(),
    pathRewrite: {
        '^/permittering': ''
    },
    secure: true,
    xfwd: true
};

module.exports = proxy(veilarbStatusProxyConfig);
