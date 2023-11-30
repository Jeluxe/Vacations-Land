const { createHashedPassword } = require('../utils/user-utils');

const createUser = ({ username, password, firstName, lastName }) => {
    global.mysqlConnection.execute(
        'insert into users (username, password,first_name,last_name) values(?,?,?,?)',
        [username, createHashedPassword(password), firstName, lastName]
    );
}


module.exports = { createUser };