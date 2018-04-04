import {
    ESSENTIAL_TYPE_LIST,
    MINING_TYPE_LIST,
    RETAIL_TYPE_LIST,
    TRANSPORT_TYPE_LIST,
} from "./types";
import axios from 'axios';
import { createURL } from "../Constants";

//START OF ESSENTIAL SERVICES ACTIONS
export const fetchEssentialTypeList = () => async dispatch => {
    const res = await axios.get(createURL('servicetypeessentialservice/'));
    dispatch({
        type: ESSENTIAL_TYPE_LIST,
        payload: {
            serviceTypes: res.data,
            status: res.status
        }
    });
};
//END OF ESSENTIAL SERVICES ACTIONS

//START OF MINING & RESOURCES SERVICES ACTIONS
export const fetchMiningTypeList = () => async dispatch => {
    const res = await axios.get(createURL('servicetypemining/'));
    dispatch({
        type: MINING_TYPE_LIST,
        payload: {
            serviceTypes: res.data,
            status: res.status
        }
    });
};
//END OF MINING & RESOURCES SERVICES ACTIONS

//START OF RETAIL & SERVICES ACTIONS
export const fetchRetailTypeList = () => async dispatch => {
    const res = await axios.get(createURL('servicetyperetail/'));
    dispatch({
        type: RETAIL_TYPE_LIST,
        payload: {
            serviceTypes: res.data,
            status: res.status
        }
    });
};
//END OF RETAIL & SERVICES ACTIONS

//START OF CAR HIRE & TRANSPORTATION SERVICES ACTIONS
export const fetchTransportTypeList = () => async dispatch => {
    const res = await axios.get(createURL('servicetypetransportation/'));
    dispatch({
        type: TRANSPORT_TYPE_LIST,
        payload: {
            serviceTypes: res.data,
            status: res.status
        }
    });
};
//END OF CAR HIRE & TRANSPORTATION SERVICES ACTIONS