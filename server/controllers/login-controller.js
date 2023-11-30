const express = require('express');
const router = express.Router();
const passport = require('passport');
const { createUser } = require('../services/user-service');
const { badRequestHandler } = require('../utils/user-utils');
const { signUpValidations } = require('../validations/login-validations');

router.post('/login', middleware,
    passport.authenticate('local', { failureRedirect: '/login' }),
    (req, res) => {
        res.sendStatus(200);
    });

router.post('/register', signUpValidations, async (req, res) => {
    try {
        await createUser(req.body);
        res.sendStatus(200);
    } catch {
        return badRequestHandler(res);
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            res.sendStatus(400);
        }
        req.logout();
        res.cookie('connect.sid', req.cookies['connect.sid'], { maxAge: -1 });
        res.sendStatus(200);
    });
});


module.exports = router;