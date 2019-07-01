import {
    AD_VIDEO_LIST,
    RESET_HANDOVER_VIDEO,
    RETRIEVE_HANDOVER_VIDEO
} from "./types";
import axios from "axios";
import { createURL, PORT, PORT_STREAMING } from "../Constants";

export const fetchAdVideoList = () => async dispatch => {
    const res = await axios.get(createURL("videodisplay/"));
    //Modify video URL here
    const videos = res.data.map(video =>
        Object.assign(video, {
            videoFile: video.videoFile.replace(PORT, PORT_STREAMING)
        })
    );
    console.log("Videos are ", videos);
    dispatch({
        type: AD_VIDEO_LIST,
        payload: {
            videos,
            status: res.status
        }
    });
};

export const resetAdVideo = () => dispatch => {
    dispatch({
        type: RESET_HANDOVER_VIDEO,
        payload: {
            videoSrc: null,
            timestamp: null
        }
    });
};

export const retrieveHandoverVideo = (videoSrc, timestamp) => dispatch => {
    dispatch({
        type: RETRIEVE_HANDOVER_VIDEO,
        payload: {
            videoSrc: videoSrc,
            timestamp: timestamp
        }
    });
};
