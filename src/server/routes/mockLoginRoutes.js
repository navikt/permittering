const paths = require('../../paths');

const dummyLoginUrl =
    'http://localhost:8080/permitteringsskjema-api/auth/mock-token?redirect=http://localhost:3000/permittering';

module.exports = (app) => {
    app.get(paths.redirectTilLoginPath, (req, res) => {
        res.redirect(dummyLoginUrl);
    });
};
