const paths = require('../../paths');
const featureToggles = require('../../fixtures/feature-toggles.json');
module.exports = app => {
    app.get(paths.featurePath, (req, res) => {
        res.json(featureToggles);
    });
};
