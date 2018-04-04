import { SPECIFIC_ADS_ACTIVITY_DESTINATION_LIST } from '../actions/types';

export default function(state = {}, action) {
    switch (action.type) {
        case SPECIFIC_ADS_ACTIVITY_DESTINATION_LIST:
            return action.payload;
        default:
            return state;
    }
}