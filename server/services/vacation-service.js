const FETCH_VACATIONS_QUERY = "select * from vacations";
const ADD_VACATION_QUERY = "insert vacations(description, destination, image, start_date, end_date, price) VALUES (?,?,?,?,?,?)";
const UPDATE_VACATION_QUERY = "UPDATE `vacations` SET `description` = ?,`destination` = ?,`image` = ?,`start_date` = ?,`end_date` = ?, `price` = ? WHERE id = ?";
const REMOVE_VACATION_QUERY = "delete from vacations where id = ?";
const REMOVE_FOLLOWED_VACATION_QUERY = "delete from user_vacations where vacation_id = ?";
const FOLLOW_VACATION_QUERY = "insert into user_vacations(user_id, vacation_id) VALUES (?,?)";
const UNFOLLOW_VACATION_QUERY = "delete from user_vacations where user_id = ? and vacation_id = ?";
const FOLLOW_VACATION_STATUS_QUERY = 'select user_id, vacation_id from user_vacations where user_id = ? and vacation_id = ?';
const FOLLOWED_VACATIONS_QUERY = "select vacation_id from user_vacations";
const FOLLOWED_VACATIONS_BY_USER_QUERY = "select vacation_id from user_vacations where user_id = ?";

const fetchData = async ({ id, isAdmin }) => {
    let rows;
    const arr = [];
    try {
        [rows] = await global.mysqlConnection.execute(FETCH_VACATIONS_QUERY, []);
        arr.push(rows);
        if (isAdmin === 1) {
            [rows] = await global.mysqlConnection.execute(FOLLOWED_VACATIONS_QUERY, []);
            arr.push(rows);
        } else {
            [rows] = await global.mysqlConnection.execute(FOLLOWED_VACATIONS_BY_USER_QUERY, [id]);
            arr.push(rows);
        }
        return arr;
    } catch (err) {
        return err;
    }
}

const addVacation = async (vacation) => {
    try {
        const { description, destination, image, start_date, end_date, price } = vacation;
        await global.mysqlConnection.execute(ADD_VACATION_QUERY, [description, destination, image, start_date, end_date, price]);
    } catch (err) {
        return err;
    }
}

const updateVacation = async (vacation) => {
    try {
        const { id, description, destination, image, start_date, end_date, price } = vacation;
        await global.mysqlConnection.execute(UPDATE_VACATION_QUERY, [description, destination, image, start_date, end_date, price, id]);
    } catch (err) {
        return err;
    }
}

const removeVacation = async (id) => {
    try {
        await global.mysqlConnection.execute(REMOVE_VACATION_QUERY, [id]);
        await global.mysqlConnection.execute(REMOVE_FOLLOWED_VACATION_QUERY, [id]);
    } catch (err) {
        return err;
    }
}

const followVacation = async (user_id, vacationId) => {
    try {
        await global.mysqlConnection.execute(FOLLOW_VACATION_QUERY, [user_id, vacationId]);
    } catch (err) {
        return err;
    }
}

const unfollowVacation = async (user_id, vacationId) => {
    try {
        await global.mysqlConnection.execute(UNFOLLOW_VACATION_QUERY, [user_id, vacationId]);
    } catch (err) {
        return err;
    }
}

const followToggle = async (user_id, vacation_id) => {
    try {
        const [rows] = await global.mysqlConnection.execute(FOLLOW_VACATION_STATUS_QUERY, [user_id, vacation_id]);
        if (rows.length > 0) {
            unfollowVacation(user_id, vacation_id);
        } else {
            followVacation(user_id, vacation_id);
        }
    } catch (err) {
        return err;
    }
}


module.exports = { fetchData, addVacation, updateVacation, removeVacation, followToggle }