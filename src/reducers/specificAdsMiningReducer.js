import { SPECIFIC_ADS_MINING_LIST } from '../actions/types';

export default function(state = {}, action) {
    switch (action.type) {
        case SPECIFIC_ADS_MINING_LIST:
            return action.payload;
        default:
            return state;
    }
}