const jws = require('jws');
const TOKENX_TOKEN_SET_KEY = 'TOKENX_TOKEN_SET_KEY';
const IDPORTEN_TOKEN_SET_KEY = 'IDPORTEN_TOKEN_SET_KEY';
const { API_AUDIENCE } = require('./konstanter');

const getTokenSetsFromSession = (req) => {
    if (req && req.user) {
        return req.user.tokenSets;
    }
    return null;
};

const tokenHasExpired = (idPortenAccessToken) => {
    const expiration = jws.decode(idPortenAccessToken).payload.exp;
    return expiration * 1000 - Date.now() < 0;
};

const ensureAuthenticated = async (req, res, next) => {
    const idPortenAccessToken = req.headers['authorization'];
    const idPortenIdToken = req.headers['x-wonderwall-id-token'];

    if (!tokenHasExpired(idPortenAccessToken)) {
        console.log('Token er ikke expired, går videre');
        next();
    } else {
        req.session.destroy();
        res.cookie('permittering-token', {
            expires: Date.now(),
        });
        res.sendStatus(401);
    }
};

const exchangeToken = (tokenXClient, tokenXIssuer, req) => {
    return new Promise((resolve, reject) => {
        if (hasValidAccessToken(req, TOKENX_TOKEN_SET_KEY)) {
            const tokenSets = getTokenSetsFromSession(req);
            resolve(tokenSets[TOKENX_TOKEN_SET_KEY].access_token);
        } else {
            const additionalClaims = {
                clientAssertionPayload: {
                    nbf: Math.floor(Date.now() / 1000),
                    aud: [tokenXIssuer],
                },
            };
            if (!req.user) {
                reject('Ikke pålogget');
            }
            console.log('Lager grant for ny token fra tokendings');
            tokenXClient
                .grant(
                    {
                        grant_type: 'urn:ietf:params:oauth:grant-type:token-exchange',
                        client_assertion_type:
                            'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
                        subject_token_type: 'urn:ietf:params:oauth:token-type:jwt',
                        audience: API_AUDIENCE,
                        subject_token: req.user.tokenSets[IDPORTEN_TOKEN_SET_KEY].access_token,
                    },
                    additionalClaims
                )
                .then((tokenSet) => {
                    req.user.tokenSets[TOKENX_TOKEN_SET_KEY] = tokenSet;
                    resolve(tokenSet.access_token);
                })
                .catch((err) => {
                    console.error(err);
                    reject(err);
                });
        }
    });
};

module.exports = {
    ensureAuthenticated,
    exchangeToken,
};
