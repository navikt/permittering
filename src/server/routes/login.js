const paths = require('../../paths');
const passport = require('passport');

module.exports = app => {
    app.get(
        paths.redirectTilLoginPath,
        passport.authenticate('idPortenOIDC', {
            successRedirect: `/permittering`,
            failureRedirect: `/permittering`,
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
};
