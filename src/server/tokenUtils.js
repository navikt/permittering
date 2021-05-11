const { TokenSet } = require('openid-client');
const session = require('express-session');
const BACKEND_CLIENT_ID = 'BACKEND_CLIENT_ID';
const { API_AUDIENCE, FRONTEND_BASE_URL } = require('./konstanter');

const getTokenSetsFromSession = req => {
    if (req && req.user) {
        return req.user.tokenSets;
    }
    return null;
};

const hasValidAccessToken = (req, key = 'self') => {
    const tokenSets = getTokenSetsFromSession(req);
    if (!tokenSets) {
        return false;
    }
    const tokenSet = tokenSets[key];
    if (!tokenSet) {
        return false;
    }
    return new TokenSet(tokenSet).expired() === false;
};

const ensureAuthenticated = async (req, res, next) => {
    if (req.isAuthenticated() && hasValidAccessToken(req)) {
        next();
    } else {
        session.redirectTo = req.originalUrl;
        res.redirect(`${FRONTEND_BASE_URL}`);
    }
};

const exchangeToken = (tokenXClient, tokenXIssuer, req) => {
    return new Promise((resolve, reject) => {
        if (hasValidAccessToken(req, BACKEND_CLIENT_ID)) {
            const tokenSets = getTokenSetsFromSession(req);
            resolve(tokenSets[BACKEND_CLIENT_ID].access_token);
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
            tokenXClient
                .grant(
                    {
                        grant_type: 'urn:ietf:params:oauth:grant-type:token-exchange',
                        client_assertion_type:
                            'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
                        subject_token_type: 'urn:ietf:params:oauth:token-type:jwt',
                        audience: API_AUDIENCE,
                        subject_token: req.user.tokenSets['self'].access_token,
                    },
                    additionalClaims
                )
                .then(tokenSet => {
                    req.user.tokenSets[BACKEND_CLIENT_ID] = tokenSet;
                    resolve(tokenSet.access_token);
                })
                .catch(err => {
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
