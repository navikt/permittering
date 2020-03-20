const paths = require('../../paths');
const dummyLoginUrl =
    'http://localhost:8080/permitteringsskjema-api/local/cookie?redirect=http://localhost:3000/permittering';
module.exports = app => {
    app.get(paths.redirectTilLoginPath, (req, res) => {
        res.redirect(process.env.LOGIN_URL || dummyLoginUrl);
    });
};
