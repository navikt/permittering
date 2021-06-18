const paths = require('../../paths');

const internalRoutes = (app) => {
    app.get(paths.isAlivePath, (req, res) => res.sendStatus(200));
    app.get(paths.isReadyPath, (req, res) => res.sendStatus(200));
};

module.exports = internalRoutes;
