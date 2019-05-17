import { EVENT_LIST } from "./types";
import axios from "axios";
import { createURL, removeHttp, MONTH_INDEX } from "../Constants";

export const fetchEventList = () => async dispatch => {
    const res = await axios.get(createURL("event/"));
    let events = res.data.slice();
    events.forEach(event => {
        event.website = !!event.website ? removeHttp(event.website) : null;
    });
    //Sort event by month period
    events.sort(
        ({ eventMonth: month1 }, { eventMonth: month2 }) =>
            MONTH_INDEX[month1] - MONTH_INDEX[month2]
    );
    dispatch({
        type: EVENT_LIST,
        payload: {
            events,
            status: res.status
        }
    });
};
