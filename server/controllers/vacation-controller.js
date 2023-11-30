const express = require('express');
const router = express.Router();
const { isAuth, vacationValidation } = require('../validations/vacation-validations');
const { fetchData, addVacation, updateVacation, removeVacation, followToggle } = require('../services/vacation-service');
const { badRequestHandler } = require('../utils/user-utils');

router.post('/', async (req, res) => {
    try {
        const data = await fetchData(req.user);
        const { username, isAdmin } = req.user;
        const payloadConstructer = {
            vacations: data[0],
            followedVacations: data[1],
            isAdmin,
            username
        }
        return res.json(payloadConstructer);
    } catch {
        return badRequestHandler(res);
    }
})

router.post('/add-vacation', isAuth, vacationValidation, async (req, res) => {
    try {
        await addVacation(req.body);
        res.sendStatus(200);
    } catch {
        return badRequestHandler(res);
    }
});

router.post('/update-vacation', isAuth, vacationValidation, async (req, res) => {
    try {
        await updateVacation(req.body);
        res.sendStatus(200);
    } catch {
        return badRequestHandler(res);
    }
});

router.get('/remove-vacation/:id', isAuth, async (req, res) => {
    try {
        await removeVacation(req.params.id);
        res.sendStatus(200);
    } catch {
        return badRequestHandler(res);
    }
});

router.get('/toggle-follow/:vacationId', async (req, res) => {
    try {
        await followToggle(req.user.id, req.params.vacationId);
        res.sendStatus(200);
    } catch {
        return badRequestHandler(res);
    }
});


module.exports = router;