const jwt = require('jsonwebtoken');
const User = require('../database/models').User;
const RefreshToken = require('../database/models').RefreshToken;
const hashPassword = require('../helpers').hashPassword;
const generateJWT = require('../helpers').generateJWT;
const compareHash = require('../helpers').compareHash;
const extractJWT = require('../helpers').extractJWT;

async function signup(req, res) {
    try {
        const hashedPassword = hashPassword(req.body.password);

        // TODO: check for duplicate users
        const user = await User.create({
            email:    req.body.email || null,
            username: req.body.username,
            password: hashedPassword
        });

        // TODO: Send email for verification

        return res.status(201).send(user); // 201 status code : resource created
    }
    catch(err) {
        return res.status(400).send(err);
    }
}

async function login(req, res) {
    try {
        const user = await User.findOne({
            where: {
                email: req.body.email
            }
        });

        if (user === null) {
            return res.status(400).send('User not found');
        }
        if (!compareHash(req.body.password, user.password)) {
            return res.status(400).send('Password doesn\'t match');
        }

        // Generate access & refresh JWT with userdata 
        const userData = {
            email: user.email,
            username: user.username,
        };
       
        const expireTime = 28 * 24 * 60 // 28 days in minutes
        
        const accessToken  = generateJWT(userData, process.env.ACCESS_TOKEN_SECRET);
        const refreshToken = generateJWT(userData, process.env.REFRESH_TOKEN_SECRET, expireTime * 60);

        // Insert refresh token into database
        await RefreshToken.create({
            tokenVal: refreshToken,
            userId:   user.id,
            createDate: new Date().getTime(),
            expireDate: new Date(new Date().getTime() + expireTime * 60000)
        });
        
        // Send both tokens as response
        return res.status(201).send(JSON.stringify({
            accessToken:  accessToken,
            refreshToken: refreshToken
        })); 
    }
    catch(err) {
        return res.status(400).send(err);
    }
}

async function refreshToken(req, res) { // Creates a new access token if refresh token is still valid
    try {
        const refreshToken = req.body.refreshToken

        // Check if refresh token is sent over
        if (!refreshToken) {
            return res.status(400).send('Refresh token missing');
        }

        // Query the appropriate refresh token from database
        const token = await RefreshToken.findOne({
            where: {
                tokenVal: refreshToken
            }
        });

        // Check if token doesn't exist
        if (!token) {
            return res.status(400).send('No matching refresh token in the database.')
        }

        // Check if token expired
        if (token.expireDate < new Date().getTime()) {
            // Delete token from database 
            await RefreshToken.destroy({
                where: {
                    id: token.id
                }
            });

            // Send error response
            return res.status(400).send('Refresh token has expired. Please login again.');
        }

        // Extract user data from refresh token and sign it to create a new access token
        const extractedData = extractJWT(token.tokenVal, process.env.REFRESH_TOKEN_SECRET);
        const userData = {
            email: extractedData.email,
            username: extractedData.username
        };

        const newAccessToken = generateJWT(userData, process.env.ACCESS_TOKEN_SECRET);

        return res.status(200).send(JSON.stringify({ accessToken: newAccessToken }));
    }
    catch(err) {
        return res.status(400).send(err);
    }
    
}

async function logout(req, res) {
    try {
        // Delete refresh token saved in the database
        const refreshToken = req.body.refreshToken;

        await RefreshToken.destroy({
            where: {
                tokenVal: refreshToken
            }
        });

        return res.status(200).json({ success: 'User logged out!' });
    }
    catch(err) {
        return res.status(400).json({ error: err });
    }
}

const authController = { 
    signup,
    login,
    refreshToken,
    logout
 };

module.exports = authController;