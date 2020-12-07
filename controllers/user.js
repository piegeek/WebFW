const User = require('../database/models').User;
const hashPassword = require('../helpers').hashPassword;

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

// async function findUserAndGenerateJWT(req, res) {
//     try {
//         const user = await User.findOne({
//             where: {
//                 username: req.params.username
//             }
//         });

//         if (user === null) {
//             return res.status(400).send('User not found');
//         }
//         if (user.password != req.body.password) {
//             return res.status(400).send('Password doesn\'t match');
//         }
//         return res.status(201).send(user); // 201 status code : resource created
//     }
//     catch(err) {
//         return res.status(400).send(err);
//     }
// }

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


const userController = { createUser, updateUserEmail, updateUserPassword, deleteUser };

module.exports = userController;