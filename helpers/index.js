const hashPassword = require('./hashPassword');
const generateJWT = require('./generateJWT');
const compareHash = require('./compareHash');
const extractJWT = require('./extractJWT');
const sendMail = require('./sendMail');

module.exports = {
    hashPassword,
    generateJWT,
    compareHash,
    extractJWT,
    sendMail
};