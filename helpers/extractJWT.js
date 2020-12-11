const jwt = require('jsonwebtoken');
const _   = require('lodash');

function extractJWT(tokenVal, tokenSecret) {
    const extractedData = jwt.verify(tokenVal, tokenSecret);
    return _.omit(extractedData, ['exp', 'iat']); // exp & iat are properties created while generating the jwt token, thus omitted
}

module.exports = extractJWT;