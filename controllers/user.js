const User = require('../database/models').User;

async function create(req, res) {
    try {
        const user = await User.create({
            email:    req.body.email || null,
            username: req.body.username,
            password: req.body.password
        });
        return res.status(201).send(user); // 201 status code : resource created
    }
    catch(err) {
        return res.status(400).send(err);
    }
}

const userController = { create };

module.exports = userController;