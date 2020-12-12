const User = require('../database/models').User;
const hashPassword = require('../helpers').hashPassword;
const createError = require('../helpers').createError;

async function updateEmail(req, res) {
    try {
        await User.update({ email: req.body.email }, {
            where: {
                username: req.body.username
            }
        });

        return res.status(200).json({ message: `Updated email to ${req.body.email}` });
    }
    catch(err) {
        return res.status(400).json(createError('internal', err));
    }
}

async function updatePassword(req, res) {
    try {
        const hashedPassword = hashPassword(req.body.password)

        await User.update({ password: hashedPassword }, {
            where: {
                username: req.body.username
            }
        });

        return res.status(200).json({ message: `Updated password` });
    }
    catch(err) {
        return res.status(400).json(createError('internal', err));
    }
}

async function deleteUser(req, res) {
    try {
        await User.destroy({
            where: {
                username: req.body.username
            }
        });

        return res.status(200).json({ message: `Deleted user: ${req.body.username}` });
    }
    catch(err) {
        return res.status(400).json(createError('internal', err));
    }
}

const userController = { 
    updateEmail, 
    updatePassword, 
    deleteUser 
};

module.exports = userController;