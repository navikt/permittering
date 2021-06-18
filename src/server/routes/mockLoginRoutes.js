const paths = require('../../paths');

const dummyLoginUrl =
    'http://localhost:8080/permitteringsskjema-api/local/cookie?issuerId=selvbetjening&audience=aud-localhost&redirect=http://localhost:3000/permittering';

module.exports = (app) => {
    app.get(paths.redirectTilLoginPath, (req, res) => {
        res.redirect(dummyLoginUrl);
    });
};
