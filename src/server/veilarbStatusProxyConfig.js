const proxy = require('http-proxy-middleware');
const paths = require('../paths.json');
const veilarbStatus = () => {
    if (process.env.NAIS_CLUSTER_NAME === 'prod-sbs') {
        return 'https://tjenester.nav.no/';
    } else {
        return 'https://tjenester-q1.nav.no/';
    }
};

const veilarbStatusProxyConfig = {
    changeOrigin: true,
    target: veilarbStatus(),
    pathRewrite: {
        [`^${paths.basePath}`]: '',
    },
    secure: true,
    xfwd: true,
};

module.exports = proxy(veilarbStatusProxyConfig);
