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
    let [data, responseStatus] = [null, 404];
    let toRender = [];
    const desDetailiD = parseInt(id, DECIMAL_RADIX);

    const selectedDestinationDetail = destinationList.find(function(item) {
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
            postLink: postLink
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
            postLink: postLink
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
            postLink: postLink
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
            postLink: postLink
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
