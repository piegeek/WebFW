const hashPassword = require('./hashPassword');
const generateJWT = require('./generateJWT');
const compareHash = require('./compareHash');

module.exports = {
    hashPassword,
    generateJWT,
    compareHash
};