const jwt = require('jsonwebtoken');

function checkJWT(req, res, next) {
    // Get token from headers
    let jwtToken = req.headers['x-access-token'] || req.headers['authorization'];
   
    // Token doesn't exist
    if (!jwtToken) {
        return res.sendStatus(400);
    }
    
    // When the token exists but its value is like 'Bearer xxxxx-xxx-xxxx'
    if (jwtToken.startsWith('Bearer ')) {
        jwtToken = jwtToken.split('Bearer ')[1];
    }
   
    jwt.verify(jwtToken, process.env.TOKEN_SECRET, (err, username) => {
        if (err) {
            return res.status(400).send(err);
        }
        
        req.username = username;
        return next();
    });
}

module.exports = checkJWT;