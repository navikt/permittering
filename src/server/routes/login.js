const paths = require('../../paths');
module.exports = app => {
    app.get(paths.redirectTilLoginPath, (req, res) => {
        const loginUrl =
            process.env.LOGIN_URL ||
            'http://localhost:8080/permitteringsskjema-api/local/cookie?redirect=http://localhost:3000/permittering';
        res.redirect(loginUrl);
    });
};
