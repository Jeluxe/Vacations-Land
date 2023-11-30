const crypto = require('crypto');
const { passwordHash } = require('./../config');

const createHashedPassword = password =>
    crypto.createHmac('sha256', passwordHash)
        .update(password)
        .digest('hex');

const badRequestHandler = (res) => res.sendStatus(400);


module.exports = { createHashedPassword, badRequestHandler };