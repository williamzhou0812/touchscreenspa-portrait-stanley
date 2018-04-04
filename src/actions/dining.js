import { DINING_LIST, DINING_DETAIL } from './types';
import axios from 'axios';
import { createURL } from '../Constants';

export const fetchDiningList = () => async dispatch => {
    const res = await axios.get(createURL('restaurant/'));
    dispatch({
        type: DINING_LIST,
        payload: {
            restaurants: res.data,
            status: res.status
        }
    });
};

export const fetchDiningDetail = (id, diningList) => async dispatch => {
    let status = null;
    let restaurant = diningList && diningList.find((item) => {
        return item.id === id;
    });
    if (restaurant) {
        status = 200;
    } else {
        restaurant = null;
    }
    dispatch({
        type: DINING_DETAIL,
        payload: {
            restaurant: restaurant,
            status: status
        }
    });
};