import { EVENT_LIST } from "./types";
import axios from 'axios';
import { createURL, getRandomImage, removeHttp } from "../Constants";

export const fetchEventList = () => async dispatch => {
    const res = await axios.get(createURL('event/'));
    let events = res.data.slice();
    events.forEach(event => {
        event.website = !!event.website ? removeHttp(event.website) : null;
    });
    dispatch({
        type: EVENT_LIST,
        payload: {
            events,
            status: res.status
        }
    });
};