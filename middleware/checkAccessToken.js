const jwt = require('jsonwebtoken');
const createError = require('../helpers').createError;

function checkAccessToken(req, res, next) {
    // Get token from headers
    let jwtToken = req.headers['x-access-token'] || req.headers['authorization'];
   
    // Token doesn't exist
    if (!jwtToken) {
        return res.status(400).json(createError('auth-006001', 'Unauthorized'));
    }
    
    // When the token exists but its value is like 'Bearer xxxxx-xxx-xxxx'
    if (jwtToken.startsWith('Bearer ')) {
        jwtToken = jwtToken.split('Bearer ')[1];
    }
   
    jwt.verify(jwtToken, process.env.ACCESS_TOKEN_SECRET, (err, userData) => {
        if (err) { // Problem with error key -> Tell user to login again
            return res.status(400).json(createError('auth-006002', 'Please login again'));
        }
        
        req.userData = userData;
        return next();
    });
}

module.exports = checkAccessToken;