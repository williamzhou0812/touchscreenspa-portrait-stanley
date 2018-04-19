import { MAP_LIST } from './types';
import axios from 'axios';
import { createURL } from '../Constants';
import AirportMap from "../Maps/PortMoresbyAirportMap.png";

export const fetchMapList = () => async dispatch => {
    const res = await axios.get(createURL('mapdestinationcity/'));
    const maps = [{...res.data[0]}, {id: "airport", title: "PORT MORESBY AIRPORT", province: null, mapImage: AirportMap }, ...res.data.slice(1)];
    dispatch({
        type: MAP_LIST,
        payload: {
            maps,
            status: res.status
        }
    });
};
