import { ADVERTISEMENT_LIST } from '../actions/types';

export default function(state = {}, action) {
    switch (action.type) {
        case ADVERTISEMENT_LIST:
            return action.payload;
        default:
            return state;
    }
}