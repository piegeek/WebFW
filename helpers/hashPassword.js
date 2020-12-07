const bcrypt = require('bcrypt');

function hashPassword(password) {
    return bcrypt.hashSync(password, parseInt(process.env.SALT_ROUNDS));
}

module.exports = hashPassword;