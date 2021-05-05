const { TokenSet } = require('openid-client');
const session = require('express-session');
const BACKEND_CLIENT_ID = 'BACKEND_CLIENT_ID';
const { FRONTEND_BASE_URL } = require('./konstanter');

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
        res.redirect(`${FRONTEND_BASE_URL}/login`);
    }
};

const exchangeToken = (tokenXClient, req) => {
    return new Promise((resolve, reject) => {
        if (hasValidAccessToken(req, BACKEND_CLIENT_ID)) {
            const tokenSets = getTokenSetsFromSession(req);
            resolve(tokenSets[BACKEND_CLIENT_ID].access_token);
        } else {
            tokenXClient
                .grant({
                    grant_type: 'urn:ietf:params:oauth:grant-type:token-exchange',
                    client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
                    subject_token_type: 'urn:ietf:params:oauth:token-type:jwt',
                    requested_token_use: 'on_behalf_of',
                    audience: 'tokenx',
                    subject_token: req.user.tokenSets['self'].access_token,
                })
                .then(tokenSet => {
                    console.log('got token from exchange', tokenSet);
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

/*

export const exchangeToken = async (session, servicename) => {
    const cachedToken = cachedTokenFrom(session, servicename)
    if (cachedToken) {
        logger.debug(`Using cached token for ${servicename}`)
        return Promise.resolve(cachedToken)
    }

    // additional claims not set by openid-client
    const additionalClaims = {
        clientAssertionPayload: {
            nbf: Math.floor(Date.now() / 1000),
            // TokenX only allows a single audience
            aud: [ tokenxMetadata.metadata.token_endpoint ],
        }
    }

    return tokenxClient.grant({
        grant_type: 'urn:ietf:params:oauth:grant-type:token-exchange',
        client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
        subject_token_type: 'urn:ietf:params:oauth:token-type:jwt',
        audience: appConfig.targetAudience,
        subject_token: session.tokens.access_token
    }, additionalClaims).then(tokenSet => {
        logger.debug(`Retrieved new token for ${servicename}`)
        session[`${servicename}_tokenset`] = tokenSet
        return Promise.resolve(tokenSet.access_token)
    }).catch(err => {
        logger.error(`Error while exchanging token: ${err}`)
        return Promise.reject(err)
    })

}
*/
module.exports = {
    ensureAuthenticated,
    exchangeToken,
};
