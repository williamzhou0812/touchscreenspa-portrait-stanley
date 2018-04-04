import { PERIOD_LIST } from './types';
import axios from 'axios';
import { createURL } from '../Constants';

export const fetchPeriodList = () => async dispatch => {
    const res = await axios.get(createURL('period/'));
    dispatch({
        type: PERIOD_LIST,
        payload: {
            periods: res.data,
            status: res.status
        }
    });
};
