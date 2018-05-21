import { SHOW_SEARCH_BAR_OUT_ANIMATION } from '../actions/types';

export default function(state = {}, action) {
    switch (action.type) {
        case SHOW_SEARCH_BAR_OUT_ANIMATION:
            return action.payload;
        default:
            return state;
    }
}
