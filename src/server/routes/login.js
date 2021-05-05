const paths = require('../../paths');
const passport = require('passport');

module.exports = app => {
    app.get(
        paths.redirectTilLoginPath,
        passport.authenticate('idPortenOIDC', {
            successRedirect: `/success`,
            failureRedirect: `/login`,
        })
    );

    app.use(
        '/permittering/oauth2/callback',
        passport.authenticate('idPortenOIDC', { failureRedirect: paths.redirectTilLoginPath }),
        (req, res) => {
            // Ref nais example app that sets id_token in a non http only session
            res.cookie('permittering-token', `${req.user.tokenSets.self.id_token}`, {
                secure: false,
                sameSite: 'lax',
                maxAge: 3600 * 1000,
            });
            res.redirect('/permittering');
        }
    );
};
