import { EVENT_LIST } from "./types";
import axios from 'axios';
import { createURL, getRandomImage } from "../Constants";

export const fetchEventList = () => async dispatch => {
    const res = await axios.get(createURL('event/'));
    // let randomImages = [];
    // res.data.forEach((d, _) => {
    //     randomImages.push(getRandomImage(d.imageEvent));
    // });
    dispatch({
        type: EVENT_LIST,
        payload: {
            events: res.data,
            // images: randomImages,
            status: res.status
        }
    });
};