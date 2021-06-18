const paths = require('../../paths');
const createEnvSettingsFile = require('../envSettings.js');

const settingsJs = (app) => {
    app.get(paths.settingsJsPath, (req, res) => {
        res.contentType('text/javascript');
        res.send(createEnvSettingsFile());
    });
};

module.exports = settingsJs;
