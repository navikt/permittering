const paths = require('../paths');
module.exports = app => {
  app.get(`${paths.base_path}/internal/isAlive`, (req, res) => res.sendStatus(200));
  app.get(`${paths.base_path}/internal/isReady`, (req, res) => res.sendStatus(200));
};
