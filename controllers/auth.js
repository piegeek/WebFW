const randtok = require('rand-token');
const nodeMailer = require('nodemailer');
const User = require('../database/models').User;
const RefreshToken = require('../database/models').RefreshToken;
const VerificationCode = require('../database/models').VerificationCode;
const hashPassword = require('../helpers').hashPassword;
const generateJWT = require('../helpers').generateJWT;
const compareHash = require('../helpers').compareHash;
const extractJWT = require('../helpers').extractJWT;
const sendMail = require('../helpers').sendMail;

async function signup(req, res) {
    try {
        const hashedPassword = hashPassword(req.body.password);

        const user = await User.create({
            email:    req.body.email,
            username: req.body.username,
            password: hashedPassword
        });

        // Create random string and store in database with reference to user
        const verificationCodeVal = randtok.uid(128);

        await VerificationCode.create({
            codeVal: verificationCodeVal,
            userId: user.id
        });

        // Send email to supplied email address with a link pointing back to a route on the server
        sendMail(user.email, 'Verify Email',`<a href="${process.env.HOST_IP}/verify-user/${verificationCodeVal}">${process.env.HOST_IP}/verify-user/${verificationCodeVal}</a>`);
        
        return res.status(200).json({ success: 'Successfully signed up'}); 
    }
    catch(err) {
        return res.status(400).json({ error: err });
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
            return res.status(400).json({ error: 'User not found' });
        }
        if (!compareHash(req.body.password, user.password)) {
            return res.status(400).json({ error: 'Password doesn\'t match' });
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
        return res.status(201).json({
            success: {
                accessToken:  accessToken,
                refreshToken: refreshToken
            }
        }); 
    }
    catch(err) {
        return res.status(400).json({ error: err });
    }
}

async function refreshToken(req, res) { // Creates a new access token if refresh token is still valid
    try {
        const refreshToken = req.body.refreshToken

        // Check if refresh token is sent over
        if (!refreshToken) {
            return res.status(400).json({ error: 'Refresh token missing' });
        }

        // Query the appropriate refresh token from database
        const token = await RefreshToken.findOne({
            where: {
                tokenVal: refreshToken
            }
        });

        // Check if token doesn't exist
        if (!token) {
            return res.status(400).json({ error: 'No matching refresh token in the database' });
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
            return res.status(400).send({ error: 'Refresh token has expired. Please login again.' });
        }

        // Extract user data from refresh token and sign it to create a new access token
        const userData = extractJWT(token.tokenVal, process.env.REFRESH_TOKEN_SECRET);
        const newAccessToken = generateJWT(userData, process.env.ACCESS_TOKEN_SECRET);

        return res.status(200).json({
            success: {
                accessToken: newAccessToken 
            }
        });
    }
    catch(err) {
        return res.status(400).json({ error: err });
    }
    
}

async function verifyUser(req, res) {
    try {
        const user = await User.findOne({
            include: [{
                model: VerificationCode,
                as: 'VerificationCodes',
                where: {
                    codeVal: req.params.verificationCode
                }
            }]
        });

        await User.update({ verified: true }, {
            where: {
                id: user.id
            }
        });

        await VerificationCode.destroy({
            where: {
                codeVal: req.params.verificationCode
            }
        });

        res.status(200).json({ success: 'User now verified' });
    }
    catch(err) {
        res.status(400).json({ error: err });
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
    verifyUser,
    logout
 };

module.exports = authController;