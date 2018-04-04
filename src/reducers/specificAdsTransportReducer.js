import { SPECIFIC_ADS_TRANSPORT_LIST } from '../actions/types';

export default function(state = {}, action) {
    switch (action.type) {
        case SPECIFIC_ADS_TRANSPORT_LIST:
            return action.payload;
        default:
            return state;
    }
}