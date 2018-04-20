import {
    ADVERTISEMENT_LIST, FEATURED_ADVERTISEMENT_LIST, SPECIFC_ADS_RESTAURANT_LIST, SPECIFIC_ADS_ACTIVITY_DESTINATION_LIST,
    SPECIFIC_ADS_ESSENTIAL_LIST, SPECIFIC_ADS_MINING_LIST, SPECIFIC_ADS_RETAIL_LIST, SPECIFIC_ADS_TRANSPORT_LIST,
    SPECIFIC_ADS_ACCOMMODATION_LIST, SPECIFIC_ADS_EVENT_LIST
} from './types';
import axios from 'axios';
import { createURL } from '../Constants';

export const fetchAdvertisementList = () => async dispatch => {
    const res = await axios.get(createURL('advertisement/'));
    const advertisements = res.data.slice();
    const adsDestination = advertisements.filter((item) => {
        return item.destination;
    });
    const adsRestaurant = advertisements.filter((item) => {
        return item.restaurant;
    });
    const adsEvent = advertisements.filter((item) => {
        return item.event;
    });
    const adsAccommodation = advertisements.filter((item) => {
        return item.accomodation;
    });
    const adsActvityDestination= advertisements.filter((item) => {
        return item.activityDestination;
    });
    const adsEssential= advertisements.filter((item) => {
        return item.essentialservice;
    });
    const adsMining= advertisements.filter((item) => {
        return item.mining;
    });
    const adsRetail = advertisements.filter((item) => {
        return item.retail;
    });
    const adsTransport = advertisements.filter((item) => {
        return item.transportation;
    });
    const adsServices = advertisements.filter((item) => {
        return item.essentialservice || item.mining || item.retail || item.transportation;
    });
    dispatch({
        type: ADVERTISEMENT_LIST,
        payload: {
            adsDestination: adsDestination,
            adsRestaurant: adsRestaurant,
            adsEvent: adsEvent,
            adsAccommodation: adsAccommodation,
            adsActivityDestination: adsActvityDestination,
            adsEssential: adsEssential,
            adsMining: adsMining,
            adsRetail: adsRetail,
            adsTransport: adsTransport,
            adsServices: adsServices,
            advertisements,
            status: res.status
        }
    });
};

export const fetchFeaturedAdvertisementList = () => async dispatch => {
    const res = await axios.get(createURL('featuredad/'));
    dispatch({
        type: FEATURED_ADVERTISEMENT_LIST,
        payload: {
            ads: res.data,
            status: res.status
        }
    });
};

export const fetchSpecificAdsRestaurantList = () => async dispatch => {
    const res = await axios.get(createURL('restaurantsimple/'));
    dispatch({
        type: SPECIFC_ADS_RESTAURANT_LIST,
        payload: {
            restaurants: res.data,
            status: res.status
        }
    });
};

export const fetchSpecificAdsActivityDestinationList = () => async dispatch => {
    const res = await axios.get(createURL('activitydestinationsimple/'));
    dispatch({
        type: SPECIFIC_ADS_ACTIVITY_DESTINATION_LIST,
        payload: {
            activityDestinations: res.data,
            status: res.status
        }
    });
};

export const fetchSpecificAdsEssentialList = () => async dispatch => {
    const res = await axios.get(createURL('essentialsimple/'));
    dispatch({
        type: SPECIFIC_ADS_ESSENTIAL_LIST,
        payload: {
            essentials: res.data,
            status: res.status
        }
    });
};

export const fetchSpecificAdsMiningList = () => async dispatch => {
    const res = await axios.get(createURL('miningsimple/'));
    dispatch({
        type: SPECIFIC_ADS_MINING_LIST,
        payload: {
            minings: res.data,
            status: res.status
        }
    });
};

export const fetchSpecificAdsRetailList = () => async dispatch => {
    const res = await axios.get(createURL('retailsimple/'));
    dispatch({
        type: SPECIFIC_ADS_RETAIL_LIST,
        payload: {
            retails: res.data,
            status: res.status
        }
    });
};

export const fetchSpecificAdsTransportList = () => async dispatch => {
    const res = await axios.get(createURL('transportationsimple/'));
    dispatch({
        type: SPECIFIC_ADS_TRANSPORT_LIST,
        payload: {
            transports: res.data,
            status: res.status
        }
    });
};

export const fetchSpecificAccommodationList = () => async dispatch => {
    const res = await axios.get(createURL('accomodationsimple/'));
    dispatch({
        type: SPECIFIC_ADS_ACCOMMODATION_LIST,
        payload: {
            accommodations: res.data,
            status: res.status
        }
    });
};

export const fetchSpecificAdsEventList = () => async dispatch => {
    const res = await axios.get(createURL('eventsimple/'));
    dispatch({
        type: SPECIFIC_ADS_EVENT_LIST,
        payload: {
            events: res.data,
            status: res.status
        }
    });
};
