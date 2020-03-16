const proxy = require('http-proxy-middleware');
const paths = require('../../paths');
const pathRewrite = {};
pathRewrite['^' + paths.apiPath] = '/permitteringsskjema-api';
module.exports = function(app) {
  const proxyConfig = {
    changeOrigin: true,
    target: process.env.APIGW_URL,
    pathRewrite,
    xfwd: true,
    headers: {
      'x-nav-apiKey': process.env.APIGW_HEADER,
    },
  };

  app.use(paths.apiPath, proxy(proxyConfig));
};
