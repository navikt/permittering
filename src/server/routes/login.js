const paths = require('../../paths');
const passport = require('passport');
const { IDPORTEN_POST_LOGOUT_REDIRECT_URI, LOGIN_URL } = require('../konstanter');

const successRedirect = LOGIN_URL ? `${LOGIN_URL}` : '/permittering';

module.exports = (app, idPortenEndSession) => {
    app.get(
        paths.redirectTilLoginPath,
        passport.authenticate('idPortenOIDC', {
            successRedirect: successRedirect,
            failureRedirect: '/permittering',
        })
    );

    app.use(
        '/permittering/oauth2/callback',
        passport.authenticate('idPortenOIDC', { failureRedirect: paths.basePath }),
        (req, res) => {
            // Ref nais example app that sets id_token in a non http only session
            // flaakjahsdf localhost-idtoken
            res.cookie('permittering-token', `${req.user.tokenSets.self.id_token}`, {
                secure: false,
                sameSite: 'lax',
                maxAge: 3600 * 1000,
            });
            res.redirect('/permittering');
        }
    );

    app.get(paths.logoutPath, function(req, res) {
        console.log('Logging out and redirecting back to', IDPORTEN_POST_LOGOUT_REDIRECT_URI);
        console.log('end session url', idPortenEndSession);
        const idToken = req.user.tokenSets ? req.user.tokenSets.self.id_token : '';
        req.session.destroy();
        req.logout();
        res.cookie('permittering-token', {
            expires: Date.now(),
        });
        if (idPortenEndSession) {
            console.log(
                `${idPortenEndSession}?post_logout_redirect_uri=${IDPORTEN_POST_LOGOUT_REDIRECT_URI}&id_token_hint=${idToken}`
            );
            res.redirect(
                `${idPortenEndSession}?post_logout_redirect_uri=${IDPORTEN_POST_LOGOUT_REDIRECT_URI}&id_token_hint=${idToken}`
            );
        } else {
            res.redirect(IDPORTEN_POST_LOGOUT_REDIRECT_URI);
        }
    });
};
