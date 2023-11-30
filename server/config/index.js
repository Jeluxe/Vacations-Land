require('dotenv').config()

module.exports = {
    PORT: process.env.PORT || 4000,
    dbConfig: {
        host: 'localhost',
        port: process.env.PORT,
        user: process.env.USER,
        database: process.env.DATABASE
    },
    cookieConfig: {
        secure: false,
        httpOnly: false,
        maxAge: 1000 * 60 * 60 * 24 * 2
    },
    passwordHash: process.env.PASSWORD_HASH,
    sessionHash: process.env.SESSION_HASH
}