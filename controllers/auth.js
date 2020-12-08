const randtoken = require('rand-token');
const User = require('../database/models').User;
const RefreshToken = require('../database/models').RefreshToken;
const hashPassword = require('../helpers').hashPassword;
const generateJWT = require('../helpers').generateJWT;
const compareHash = require('../helpers').compareHash;

async function signup(req, res) {
    try {
        const hashedPassword = hashPassword(req.body.password);

        const user = await User.create({
            email:    req.body.email || null,
            username: req.body.username,
            password: hashedPassword
        });

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

        // Generate JWT with userdata 
        const userdata = {
            email: user.email,
            username: user.username,
        };
        const accessToken  = generateJWT(userdata);

        // Create refresh token(random)
        const refreshToken = randtoken.uid(255); // tokenVal is VARCHAR(255) in database

        // Insert refresh token into database
        const expireTime = 28 * 24 * 60 // 28 days in minutes
    
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
        })); // 201 status code : resource created
    }
    catch(err) {
        return res.status(400).send(err);
    }
}

const authController = { 
    signup,
    login
 };

module.exports = authController;