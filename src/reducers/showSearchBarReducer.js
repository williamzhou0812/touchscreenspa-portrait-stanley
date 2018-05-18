import { SHOW_SEARCH_BAR } from '../actions/types';

export default function(state = {}, action) {
    switch (action.type) {
        case SHOW_SEARCH_BAR:
            return action.payload;
        default:
            return state;
    }
}
