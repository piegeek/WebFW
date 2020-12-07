const bcrypt = require('bcrypt');

function compareHash(plain, hashed) {
    return bcrypt.compareSync(plain, hashed);
}

module.exports = compareHash;