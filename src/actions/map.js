import { MAP_LIST } from './types';
import axios from 'axios';
import { createURL } from '../Constants';

export const fetchMapList = () => async dispatch => {
    const res = await axios.get(createURL('mapdestinationcity/'));
    dispatch({
        type: MAP_LIST,
        payload: {
            maps: res.data,
            status: res.status
        }
    });
};
