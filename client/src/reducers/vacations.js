import _ from 'lodash';
const vacations = (state = defaultState, action) => {
    const { type, payload } = action;
    switch (type) {
        case 'USER_STATUS':
            return { vacations: state.vacations, followedVacations: state.followedVacations, isAdmin: (!_.isUndefined(payload.isAdmin)) ? payload.isAdmin : state.isAdmin, username: payload.username };
        case 'FETCH_VACATIONS':
            return { vacations: payload.vacations, followedVacations: payload.followedVacations, isAdmin: payload.isAdmin, username: payload.username };
        default:
            return state;
    }
}

const defaultState = {
    vacations: [],
    followedVacations: [],
    isAdmin: 0,
    username: 'Guest',
}

export default vacations;