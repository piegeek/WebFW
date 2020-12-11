const User = require('../database/models').User;

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
        return res.status(400).json({ error: err });
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

        return res.sendStatus(200);
    }
    catch(err) {
        return res.status(400).json({ error: err });
    }
}

const userController = { 
    updateUserEmail, 
    updateUserPassword, 
    deleteUser 
};

module.exports = userController;