import { DESTINATION_LIST, DESTINATION_DETAIL } from './types';
import axios from 'axios';
import {
    createURL,
    getRandomImage,
    accomodationNamespace,
    eventNamespace,
    diningNamespace,
    activityNamespace,
    DECIMAL_RADIX,
    transportNamespace,
    retailNamespace,
    miningNamespace,
    essentialNamespace
} from '../Constants';
import AccommodationIcon from '../MainTab/icons/ACCOMMODATION_ICON.png';
import ActivitiesIcon from '../MainTab/icons/ACTIVITIES_ICON.png';
import DiningIcon from '../MainTab/icons/DINING_ICON.png';
import EventsIcon from '../MainTab/icons/EVENTS_ICON.png';
import TransportIcon from '../Service/icons/TRANSPORT_ICON.png';
import RetailIcon from "../Service/icons/RETAIL_ICON.png";
import MiningIcon from "../Service/icons/MINING_ICON.png";
import EssentialIcon from "../Service/icons/ESSENTIAL_ICON.png";

export const fetchDestinationList = () => async dispatch => {
    const res = await axios.get(createURL('destination/'));
    let randomImages = [];
    let destinations = res.data.slice();
    destinations.forEach((d, _) => {
        //Select random images
        randomImages.push(getRandomImage(d.imageDestination));

        //Generate explore data in advance
        let toRender = [];
        d.eventDestination.forEach((item, _) => {
            const linkTo = eventNamespace + '/' + item.id;
            toRender.push({
                id: item.id,
                period: item.period,
                title: item.title,
                type: 'EVENT',
                linkTo: linkTo,
                icon: EventsIcon
            });
        });
        d.accomodationDestination.forEach((item, _) => {
            const linkTo = accomodationNamespace + '/' + d.id + '/' + item.id;
            toRender.push({
                id: item.id,
                title: item.title,
                type: 'HOTEL',
                linkTo: linkTo,
                icon: AccommodationIcon
            });
        });
        d.restaurantDestination.forEach((item, _) => {
            const linkTo = diningNamespace + '/' + item.id;
            toRender.push({
                id: item.id,
                title: item.title,
                type: 'DINING',
                linkTo: linkTo,
                icon: DiningIcon
            });
        });
        d.activityDestinationDestination.forEach((item, _) => {
            const linkTo = activityNamespace + '/' + item.activity + '/' + item.id;
            toRender.push({
                id: item.id,
                title: `${item.activityTitle} IN ${item.title}`,
                activity: item.activity,
                type: 'ACTIVITIES',
                linkTo: linkTo,
                icon: ActivitiesIcon
            });
        });
        d.transportationDestination.forEach((item) => {
            const linkTo = transportNamespace + '/' + item.serviceType + '/' + item.id;
            toRender.push({
                id: item.id,
                title: item.title,
                isBranch: item.isBranch,
                type: 'CAR HIRE & TRANSPORT',
                linkTo: linkTo,
                icon: TransportIcon
            });
        });
        d.retailDestination.forEach((item) => {
            const linkTo = retailNamespace + '/' + item.serviceType + '/' + item.id;
            toRender.push({
                id: item.id,
                title: item.title,
                isBranch: item.isBranch,
                type: 'RETAIL & SERVICES',
                linkTo: linkTo,
                icon: RetailIcon
            });
        });
        d.miningDestination.forEach((item) => {
            const linkTo = miningNamespace + '/' + item.serviceType + '/' + item.id;
            toRender.push({
                id: item.id,
                title: item.title,
                isBranch: item.isBranch,
                type: 'MINING & RESOURCES',
                linkTo: linkTo,
                icon: MiningIcon
            });
        });
        d.essentialServiceDestination.forEach((item) => {
            const linkTo = essentialNamespace + '/' + item.serviceType + '/' + item.id;
            toRender.push({
                id: item.id,
                title: item.title,
                isBranch: item.isBranch,
                type: 'ESSENTIAL SERVICES',
                linkTo: linkTo,
                icon: EssentialIcon
            });
        });
        d.exploreData = toRender.slice();
    })
    dispatch({
        type: DESTINATION_LIST,
        payload: {
            destinations,
            images: randomImages,
            status: res.status
        }
    });
};

export const fetchDestinationDetail = (
    id,
    destinationList
) => async dispatch => {
    let [data, responseStatus] = [null, 404];
    // let toRender = [];
    const desDetailiD = parseInt(id, DECIMAL_RADIX);
    const selectedDestinationDetail = destinationList.find((item) => {
        return item.id === desDetailiD;
    });

    if (selectedDestinationDetail) {
        data = selectedDestinationDetail;
        responseStatus = 200;
    }

    // data.eventDestination.forEach((item, _) => {
    //     const linkTo = eventNamespace + '/' + item.period + '/' + item.id;
    //     toRender.push({
    //         id: item.id,
    //         period: item.period,
    //         title: item.title,
    //         type: 'EVENT',
    //         linkTo: linkTo,
    //         icon: EventsIcon
    //     });
    // });
    // data.accomodationDestination.forEach((item, _) => {
    //     const linkTo = accomodationNamespace + '/' + data.id + '/' + item.id;
    //     toRender.push({
    //         id: item.id,
    //         title: item.title,
    //         type: 'HOTEL',
    //         linkTo: linkTo,
    //         icon: AccommodationIcon
    //     });
    // });
    // data.restaurantDestination.forEach((item, _) => {
    //     const linkTo = diningNamespace + '/' + item.id;
    //     toRender.push({
    //         id: item.id,
    //         title: item.title,
    //         type: 'DINING',
    //         linkTo: linkTo,
    //         icon: DiningIcon
    //     });
    // });
    // data.activityDestinationDestination.forEach((item, _) => {
    //     const linkTo = activityNamespace + '/' + item.activity + '/' + item.id;
    //     toRender.push({
    //         id: item.id,
    //         title: `${item.activityTitle} IN ${item.title}`,
    //         activity: item.activity,
    //         type: 'ACTIVITIES',
    //         linkTo: linkTo,
    //         icon: ActivitiesIcon
    //     });
    // });
    // data.transportationDestination.forEach((item) => {
    //     const linkTo = transportNamespace + '/' + item.serviceType + '/' + item.id;
    //     toRender.push({
    //         id: item.id,
    //         title: item.title,
    //         isBranch: item.isBranch,
    //         type: 'CAR HIRE & TRANSPORT',
    //         linkTo: linkTo,
    //         icon: TransportIcon
    //     });
    // });
    // data.retailDestination.forEach((item) => {
    //     const linkTo = retailNamespace + '/' + item.serviceType + '/' + item.id;
    //     toRender.push({
    //         id: item.id,
    //         title: item.title,
    //         isBranch: item.isBranch,
    //         type: 'RETAIL & SERVICES',
    //         linkTo: linkTo,
    //         icon: RetailIcon
    //     });
    // });
    // data.miningDestination.forEach((item) => {
    //     const linkTo = miningNamespace + '/' + item.serviceType + '/' + item.id;
    //     toRender.push({
    //         id: item.id,
    //         title: item.title,
    //         isBranch: item.isBranch,
    //         type: 'MINING & RESOURCES',
    //         linkTo: linkTo,
    //         icon: MiningIcon
    //     });
    // });
    // data.essentialServiceDestination.forEach((item) => {
    //     const linkTo = essentialNamespace + '/' + item.serviceType + '/' + item.id;
    //     toRender.push({
    //         id: item.id,
    //         title: item.title,
    //         isBranch: item.isBranch,
    //         type: 'ESSENTIAL SERVICES',
    //         linkTo: linkTo,
    //         icon: EssentialIcon
    //     });
    // });
    dispatch({
        type: DESTINATION_DETAIL,
        payload: {
            destination: data,
            status: responseStatus
        }
    });
    //console.log(res);
};
