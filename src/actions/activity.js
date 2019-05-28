import {
    ACTIVITY_LIST,
    ACTIVITY_DESTINATION_LIST,
    ACTIVITY_DESTINATION_DETAIL,
    RESET_ACTIVITY_DESTINATION_DETAIL,
    RESET_ACTIVITY_DESTINATION_LIST
} from "./types";
import { isEmpty } from "lodash";
import axios from "axios";
import { createURL, getHeaderImagesNoMap } from "../Constants";

function getHeaderImageFromActivity(data) {
    let randomImages = [];
    //Getting all images from all accommodations according to destination
    data.forEach((d, _) => {
        randomImages = [
            ...randomImages,
            ...getHeaderImagesNoMap(d.imageActivity).map(item => item.imageFile)
        ];
    });
    return randomImages;
}

export const fetchActivityList = () => async dispatch => {
    const res = await axios.get(createURL("activity/"));
    let activities = res.data.slice();
    activities.forEach(activity => {
        activity.mapActivity = [];
        activity.activityDestinationActivity.forEach((a, activityIndex) => {
            let toRemove = [];
            activity.mapActivity = [
                ...activity.mapActivity,
                ...a.imageActivityDestination.filter((item, imageIndex) => {
                    if (item.title.toLowerCase().includes("map")) {
                        toRemove = [...toRemove, imageIndex];
                        return true;
                    }
                })
            ];
            if (toRemove.length > 0) {
                //Remove image from destination from activity since it is an image
                activity.activityDestinationActivity = [
                    ...activity.activityDestinationActivity.slice(
                        0,
                        activityIndex
                    ),
                    {
                        ...activity.activityDestinationActivity[activityIndex],
                        imageActivityDestination: activity.activityDestinationActivity[
                            activityIndex
                        ].imageActivityDestination.filter(
                            (_, index) => !toRemove.includes(index)
                        )
                    },
                    ...activity.activityDestinationActivity.slice(
                        activityIndex + 1
                    )
                ];
            }
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
    let activity =
        activityList &&
        activityList.find(item => {
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

export const fetchActivityDestinationDetail = (
    actid,
    destid,
    activityList
) => dispatch => {
    let status = null;
    let activity =
        activityList &&
        activityList.find(act => {
            return act.id === actid;
        });
    let index = -1;
    const activityDestination = isEmpty(activity)
        ? null
        : activity.activityDestinationActivity.find((dest, destIndex) => {
              if (dest.id === destid) {
                  index = destIndex;
                  return true;
              }
          });
    if (activity && activityDestination && index > -1) {
        status = 200;
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

export const fetchActivityDestinationDetailAvailableData = (
    destid,
    activity
) => dispatch => {
    let status = null;
    let index = -1;
    const activityDestination = isEmpty(activity)
        ? null
        : activity.activityDestinationActivity.find((dest, i) => {
              if (dest.id === destid) {
                  index = i;
                  return true;
              }
          });

    if (activityDestination && index > -1) {
        status = 200;
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

export const resetActivityDestinationList = () => dispatch => {
    dispatch({
        type: RESET_ACTIVITY_DESTINATION_LIST,
        payload: {
            activity: null,
            status: null
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
