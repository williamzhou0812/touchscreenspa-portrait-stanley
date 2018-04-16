import { DINING_LIST, DINING_DETAIL } from './types';
import axios from 'axios';
import { createURL } from '../Constants';

export const fetchDiningList = () => async dispatch => {
    const res = await axios.get(createURL('restaurant/'));
    let restaurants = res.data.slice();
    restaurants.forEach(rest => {
        let restGuide = {};
        let displayGuide = false;
        //Cuisine
        if (rest.cuisine && rest.cuisine.length > 0) {
            restGuide.cuisine = rest.cuisine;
            displayGuide = displayGuide || true;
        }
        //Takeaway & Additional Info
        if (rest.takeaway && rest.takeaway.length > 1) {
            if (rest.takeawayOther && rest.takeawayOther.length > 0) {
                restGuide.takeaway = `${rest.takeaway} - ${rest.takeawayOther}`;
            } else {
                restGuide.takeaway = rest.takeaway;
            }
            displayGuide = displayGuide || true;
        }
        //Wi-Fi & Additional Info
        if (rest.wifi && rest.wifi.length > 1) {
            if (rest.wifiOther && rest.wifiOther.length > 0) {
                restGuide.wifi = `${rest.wifi} - ${rest.wifiOther}`;
            } else {
                restGuide.wifi = rest.wifi;
            }
            displayGuide = displayGuide || true;
        }
        //Secure Parking & Additional Info
        if (rest.parking && rest.parking.length > 1) {
            if (rest.parkingOther && rest.parkingOther.length > 0) {
                restGuide.parking = `${rest.parking} - ${rest.parkingOther}`;
            } else {
                restGuide.parking = rest.parking;
            }
            displayGuide = displayGuide || true;
        }
        //Courtesy Transport & Additional Info
        if (rest.courtesy && rest.courtesy.length > 1) {
            if (rest.courtesyOther && rest.courtesyOther.length > 0) {
                restGuide.courtesy = `${rest.courtesy} - ${rest.courtesyOther}`;
            } else {
                restGuide.courtesy = rest.courtesy;
            }
            displayGuide = displayGuide || true;
        }
        //Cards accepted
        if (rest.cards && rest.cards.length > 0) {
            restGuide.cards = rest.cards;
            displayGuide = displayGuide || true;
        }
        //Price Guide
        if (rest.price && rest.price.length > 0) {
            restGuide.price = rest.price;
            displayGuide = displayGuide || true;
        }
        rest.guide = restGuide;
        rest.displayGuide = displayGuide;
    });
    dispatch({
        type: DINING_LIST,
        payload: {
            restaurants,
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