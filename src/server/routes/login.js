const { LOGIN_URL } = require('../konstanter');

const loginRoute = (app) => {
    app.get('/permittering/login-callback', function (req, res) {
        console.log('Redirecter til loginservice');
        res.redirect(LOGIN_URL);
    });
};

module.exports = loginRoute;
