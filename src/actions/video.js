import {
    AD_VIDEO_LIST,
    RESET_HANDOVER_VIDEO,
    RETRIEVE_HANDOVER_VIDEO
} from './types';
import axios from 'axios';
import { createURL } from '../Constants';

export const fetchAdVideoList = () => async dispatch => {
    const res = await axios.get(createURL('videodisplay/'));
    dispatch({
        type: AD_VIDEO_LIST,
        payload: {
            videos: res.data,
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
