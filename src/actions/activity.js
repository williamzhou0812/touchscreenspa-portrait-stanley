import { ACTIVITY_LIST, ACTIVITY_DESTINATION_LIST, ACTIVITY_DESTINATION_DETAIL, RESET_ACTIVITY_DESTINATION_DETAIL } from "./types";
import axios from 'axios';
import { createURL, getHeaderImagesNoMap, getRandomImage } from "../Constants";

function getHeaderImageFromActivity(data) {
    let randomImages = [];
    //Getting all images from all accommodations according to destination
    data.forEach((d, _) => {
        let tempImages = [];
        randomImages = [...randomImages, ... getHeaderImagesNoMap(d.imageActivity).map(item => item.imageFile)];
    });
    return randomImages;
}

export const fetchActivityList = () => async dispatch => {
    const res = await axios.get(createURL('activity/'));
    let activities = res.data.slice();
    activities.forEach((activity) => {
        activity.mapActivity = [];
        activity.activityDestinationActivity.forEach((a) => {
            activity.mapActivity = [...activity.mapActivity, ...a.imageActivityDestination.filter((item) => {
                return item.title.toLowerCase().includes("map");
            })];
        });
    });
    dispatch({
        type: ACTIVITY_LIST,
        payload: {
            activities,
            images: getHeaderImageFromActivity(res.data),
            status: res.status
        }
    });
};

export const fetchActivityDestinationList = (id, activityList) => dispatch => {
    let status = null;
    let activity = activityList && activityList.find((item) => {
        return item.id === id;
    });
    if (activity) {
        status = 200;
    } else {
        activity = null;
    }
    dispatch({
        type: ACTIVITY_DESTINATION_LIST,
        payload: {
            activity: activity,
            status: status
        }
    });
};

export const fetchActivityDestinationDetail = (actid, destid, activityList) => dispatch => {
    let status = null;
    let activity = activityList && activityList.find((act) => {
        return act.id === actid;
    });
    let activityDestination = activity && activity.activityDestinationActivity.find((dest) => {
        return dest.id === destid
    });
    if (activity && activityDestination) {
        status = 200;
    } else {
        activity = null;
        activityDestination = null;
    }
    dispatch({
        type: ACTIVITY_DESTINATION_DETAIL,
        payload: {
            activity: activity,
            activityDestination: activityDestination,
            status: status
        }
    });
};

export const fetchActivityDestinationDetailAvailableData = (destid, activity) => dispatch => {
    let status = null;
    let activityDestination = null;
    let index = -1;
    activity && activity.activityDestinationActivity.forEach((dest, i) => {
        if (dest.id === destid) {
            activityDestination = {...dest};
            index = i;
        }
    });
    
    if (activityDestination && index > -1) {
        status = 200;
    } else {
        activity = null;
        activityDestination = null;
    }
    dispatch({
        type: ACTIVITY_DESTINATION_DETAIL,
        payload: {
            activity,
            activityDestination,
            index,
            status
        }
    });
};

export const resetActivityDestinationDetail = () => dispatch => {
    dispatch({
        type: RESET_ACTIVITY_DESTINATION_DETAIL,
        payload: {
            activity: null,
            activityDestination: null,
            status: null
        }
    });
};