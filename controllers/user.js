const User = require('../database/models').User;
const hashPassword = require('../helpers').hashPassword;
const generateJWT = require('../helpers').generateJWT;
const compareHash = require('../helpers').compareHash;

async function createUser(req, res) {
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

async function findUserAndGenerateJWT(req, res) {
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

async function updateUserEmail(req, res) {
    try {
        await User.update({ email: req.body.email }, {
            where: {
                username: req.body.username
            }
        });

        return res.sendStatus(200);
    }
    catch(err) {
        return res.status(400).send(err);
    }
}

async function updateUserPassword(req, res) {
    try {
        await User.update({ password: req.body.password}, {
            where: {
                username: req.body.username
            }
        });

        return res.sendStatus(200);
    }
    catch(err) {
        return res.status(400).send(err);
    }
}

async function deleteUser(req, res) {
    try {
        await User.destroy({
            where: {
                username: req.body.username
            }
        });

        return res.sendStatus(200);
    }
    catch(err) {
        return res.status(400).send(err);
    }
}


const userController = { createUser, findUserAndGenerateJWT, updateUserEmail, updateUserPassword, deleteUser };

module.exports = userController;