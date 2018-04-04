import { DINING_DETAIL } from '../actions/types';

export default function(state = {}, action) {
    switch (action.type) {
        case DINING_DETAIL:
            return action.payload;
        default:
            return state;
    }
}