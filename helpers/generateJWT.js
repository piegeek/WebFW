const jwt = require('jsonwebtoken');

function generateJWT(userData, tokenSecret, expire = '300s') {
    return jwt.sign(userData, tokenSecret, { expiresIn: expire })
}

module.exports = generateJWT;