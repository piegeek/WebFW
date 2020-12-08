const jwt = require('jsonwebtoken');

function generateJWT(userData, expire = '300s') {
    return jwt.sign(userData, process.env.TOKEN_SECRET, { expiresIn: expire })
}

module.exports = generateJWT;