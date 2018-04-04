import { ACCOMMODATION_LIST } from '../actions/types';

export default function(state = {}, action) {
    switch (action.type) {
        case ACCOMMODATION_LIST:
            return action.payload;
        default:
            return state;
    }
}