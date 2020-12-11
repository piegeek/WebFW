const User = require('../database/models').User;
const hashPassword = require('../helpers').hashPassword;

async function updateEmail(req, res) {
    try {
        await User.update({ email: req.body.email }, {
            where: {
                username: req.body.username
            }
        });

        return res.status(200).json({ success: `Updated email to ${req.body.email}` });
    }
    catch(err) {
        return res.status(400).json({ error: err });
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

        return res.status(200).json({ success: `Updated password` });
    }
    catch(err) {
        return res.status(400).json({ error: err });
    }
}

async function deleteUser(req, res) {
    try {
        await User.destroy({
            where: {
                username: req.body.username
            }
        });

        return res.status(200).json({ success: `Deleted user: ${req.body.username}` });
    }
    catch(err) {
        return res.status(400).json({ error: err });
    }
}

const userController = { 
    updateEmail, 
    updatePassword, 
    deleteUser 
};

module.exports = userController;