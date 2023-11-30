import axios from 'axios';

export const fetchVacations = () => {
    return dispatch => axios.post('/')
        .then(({ data: payload }) => {
            return dispatch({
                type: 'FETCH_VACATIONS',
                payload
            });
        });
}