const jwt = require('jsonwebtoken');

function generateJWT(username, expire = '1800s') {
    return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: expire })
}

module.exports = generateJWT;