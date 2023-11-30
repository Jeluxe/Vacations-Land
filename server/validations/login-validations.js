const _ = require('lodash');


const signUpValidations = async (req, res, next) => {
    const { username, password, confirmPass, firstName, lastName } = req.body;
    const [rows] = await global.mysqlConnection.execute('select username from users where username = ?', [username]);

    if (rows.length === 0 &&
        username.length >= 4 &&
        username.length <= 24 &&
        password.length >= 8 &&
        password.length <= 30 &&
        checkCase(password) &&
        confirmPass === password &&
        firstName && lastName) {
        return next();
    }
    return res.sendStatus(400);
}

const checkCase = password => {
    const regLowerCase = /[a-z]/g;
    const regUpperCase = /[A-Z]/g;
    const regNumbers = /[0-9]/g;
    const cases = {
        lowerCase: false,
        upperCase: false,
        numbers: false
    }

    if (regLowerCase.test(password)) {
        cases.lowerCase = true;
    }
    if (regUpperCase.test(password)) {
        cases.upperCase = true;
    }
    if (regNumbers.test(password)) {
        cases.numbers = true;
    }
    if (_.values(cases).every(value => value === true)) {
        return true;
    } else {
        return false;
    }
}


module.exports = { signUpValidations }