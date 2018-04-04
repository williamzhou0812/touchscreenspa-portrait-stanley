import { DINING_LIST } from '../actions/types';

export default function(state = {}, action) {
    switch (action.type) {
        case DINING_LIST:
            return action.payload;
        default:
            return state;
    }
}