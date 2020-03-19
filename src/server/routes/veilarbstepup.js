const paths = require('../../paths');
const veilarbStatusProxyConfig = require('../veilarbStatusProxyConfig');

module.exports = app => {
    app.use(paths.veilarbstepupPath, veilarbStatusProxyConfig);
};
