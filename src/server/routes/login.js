const paths = require('../../paths');
const passport = require('passport');
const { IDPORTEN_POST_LOGOUT_REDIRECT_URI, LOGIN_URL } = require('../konstanter');

const successRedirect = LOGIN_URL ? `${LOGIN_URL}` : '/permittering';

const loginRoutes = (app, idPortenEndSession) => {
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
            res.cookie(
                'permittering-token',
                `${req.user.tokenSets.IDPORTEN_TOKEN_SET_KEY.id_token}`,
                {
                    secure: false,
                    sameSite: 'lax',
                    maxAge: 3600 * 1000,
                }
            );
            res.redirect(successRedirect);
        }
    );

    app.get(paths.logoutPath, function (req, res) {
        let idToken = null;
        if (req.user) {
            idToken = req.user.tokenSets ? req.user.tokenSets.IDPORTEN_TOKEN_SET_KEY.id_token : '';
        }
        req.session.destroy();
        req.logout();
        res.cookie('permittering-token', {
            expires: Date.now(),
        });
        res.cookie('selvbetjening-idtokenn', {
            expires: Date.now(),
        });
        if (idPortenEndSession) {
            res.redirect(
                `${idPortenEndSession}?post_logout_redirect_uri=${IDPORTEN_POST_LOGOUT_REDIRECT_URI}&id_token_hint=${idToken}`
            );
        } else {
            res.redirect(IDPORTEN_POST_LOGOUT_REDIRECT_URI);
        }
    });
};

module.exports = loginRoutes;
