const jws = require('jws');
const { API_AUDIENCE } = require('./konstanter');

const getAccessToken = (req) => {
    return req.headers['authorization']?.replace('Bearer', '')?.trim();
};

const tokenHasExpired = (idPortenAccessToken) => {
    const expiration = jws.decode(idPortenAccessToken).payload.exp;
    // Convert seconds to milliseconds
    return expiration * 1000 - Date.now() < 0;
};

const ensureAuthenticated = async (req, res, next) => {
    const idPortenAccessToken = getAccessToken(req);

    if (idPortenAccessToken && !tokenHasExpired(idPortenAccessToken)) {
        next();
    } else {
        res.sendStatus(401);
    }
};

const exchangeToken = (tokenXClient, tokenXIssuer, req) => {
    return new Promise((resolve, reject) => {
        const additionalClaims = {
            clientAssertionPayload: {
                nbf: Math.floor(Date.now() / 1000),
                aud: [tokenXIssuer],
            },
        };

        const idPortenAccessToken = getAccessToken(req);

        console.log('Lager grant for ny token fra tokendings');
        tokenXClient
            .grant(
                {
                    grant_type: 'urn:ietf:params:oauth:grant-type:token-exchange',
                    client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
                    subject_token_type: 'urn:ietf:params:oauth:token-type:jwt',
                    audience: API_AUDIENCE,
                    subject_token: idPortenAccessToken,
                },
                additionalClaims
            )
            .then((tokenSet) => {
                resolve(tokenSet.access_token);
            })
            .catch((err) => {
                console.error(err);
                reject(err);
            });
    });
};

module.exports = {
    ensureAuthenticated,
    exchangeToken,
};
