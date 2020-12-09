const jwt = require('jsonwebtoken');

function extractJWT(tokenVal, tokenSecret) {
    return jwt.verify(tokenVal, tokenSecret);
}

module.exports = extractJWT;