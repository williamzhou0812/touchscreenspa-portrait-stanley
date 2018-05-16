import { DISPLAY_SEARCH_RESULTS_PAGE } from '../actions/types';

export default function(state = {}, action) {
    switch (action.type) {
        case DISPLAY_SEARCH_RESULTS_PAGE:
            return action.payload;
        default:
            return state;
    }
}
