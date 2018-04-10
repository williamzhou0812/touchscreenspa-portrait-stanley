import { DESTINATION_LIST, DESTINATION_DETAIL } from './types';
import axios from 'axios';
import {
    createURL,
    getRandomImage,
    accomodationNamespace,
    eventNamespace,
    diningNamespace,
    activityNamespace,
    DECIMAL_RADIX
} from '../Constants';
import AccommodationIcon from '../MainTab/icons/ACCOMMODATION_ICON.svg';
import ActivitiesIcon from '../MainTab/icons/ACTIVITIES_ICON.svg';
import DiningIcon from '../MainTab/icons/DINING_ICON.svg';
import EventsIcon from '../MainTab/icons/EVENTS_ICON.svg';

export const fetchDestinationList = () => async dispatch => {
    const res = await axios.get(createURL('destination/'));
    let randomImages = [];
    res.data.forEach((d, _) => {
        randomImages.push(getRandomImage(d.imageDestination));
    });
    dispatch({
        type: DESTINATION_LIST,
        payload: {
            destinations: res.data,
            images: randomImages,
            statusDestinations: res.status
        }
    });
};

export const fetchDestinationDetail = (
    id,
    destinationList
) => async dispatch => {
    console.log(id);
    console.log(destinationList);
    let [data, responseStatus] = [null, 404];
    let toRender = [];
    const desDetailiD = parseInt(id, DECIMAL_RADIX);
    const selectedDestinationDetail = destinationList.find((item) => {
        return item.id === desDetailiD;
    });

    if (selectedDestinationDetail) {
        data = selectedDestinationDetail;
        responseStatus = 200;
    }

    data.eventDestination.forEach((item, _) => {
        const linkTo = eventNamespace + '/' + item.period + '/' + item.id;
        const postLink = createURL(`eventpost/${item.id}/`);
        toRender.push({
            id: item.id,
            period: item.period,
            title: item.title,
            type: 'EVENT',
            linkTo: linkTo,
            postLink: postLink,
            icon: EventsIcon
        });
    });
    data.accomodationDestination.forEach((item, _) => {
        const linkTo = accomodationNamespace + '/' + data.id + '/' + item.id;
        const postLink = createURL(`accomodationpost/${item.id}/`);
        toRender.push({
            id: item.id,
            title: item.title,
            type: 'HOTEL',
            linkTo: linkTo,
            postLink: postLink,
            icon: AccommodationIcon
        });
    });
    data.restaurantDestination.forEach((item, _) => {
        const linkTo = diningNamespace + '/' + item.id;
        const postLink = createURL(`restaurantpost/${item.id}/`);
        toRender.push({
            id: item.id,
            title: item.title,
            type: 'DINING',
            linkTo: linkTo,
            postLink: postLink,
            icon: DiningIcon
        });
    });
    data.activityDestinationDestination.forEach((item, _) => {
        const linkTo = activityNamespace + '/' + item.activity + '/' + item.id;
        const postLink = createURL(`activitydestinationpost/${item.id}/`);
        toRender.push({
            id: item.id,
            title: `${item.activityTitle} IN ${item.title}`,
            activity: item.activity,
            type: 'ACTIVITIES',
            linkTo: linkTo,
            postLink: postLink,
            icon: ActivitiesIcon
        });
    });
    dispatch({
        type: DESTINATION_DETAIL,
        payload: {
            destination: data,
            status: responseStatus,
            exploreData: toRender
        }
    });
    //console.log(res);
};
