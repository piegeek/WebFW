const User = require('../database/models').User;
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

        // Generate JWT with userdata and send it back as response
        const userdata = {
            email: user.email,
            username: user.username,
        };

        const token = generateJWT(userdata);
        
        return res.status(201).send(token); // 201 status code : resource created
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