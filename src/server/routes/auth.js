const { LOGIN_URL } = require('../konstanter');

const authRoutes = (app) => {
    app.get('/permittering/login-callback', function (req, res) {
        res.redirect(LOGIN_URL);
    });

    app.get('/permittering/logout-callback', function (req, res) {
        res.redirect(LOGIN_URL);
    });
};

module.exports = authRoutes;
