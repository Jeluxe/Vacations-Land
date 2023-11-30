const _ = require('lodash');
const { badRequestHandler } = require('../utils/user-utils');

const isAuth = (req, res, next) => {
    const { isAdmin } = req.user;
    if (isAdmin == 1) {
        return next();
    }
    return res => res.sendStatus(401);
}

const vacationValidation = (req, res, next) => {
    const { description, destination, image, start_date, end_date, price } = req.body;
    if (description.length > 0 &&
        description.length <= 260 &&
        destination.length > 0 &&
        destination.length <= 50 &&
        image && start_date && end_date &&
        price > 0 && _.isNumber(price)) {
        return next();
    }
    return badRequestHandler(res);
}


module.exports = { isAuth, vacationValidation }