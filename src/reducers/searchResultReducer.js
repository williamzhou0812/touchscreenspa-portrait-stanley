import { SEARCH_RESULTS, RESET_SEARCH_RESULTS } from '../actions/types';

export default function(state = {}, action) {
    switch (action.type) {
        case SEARCH_RESULTS:
            return action.payload;
        case RESET_SEARCH_RESULTS:
            return action.payload;
        default:
            return state;
    }
}
