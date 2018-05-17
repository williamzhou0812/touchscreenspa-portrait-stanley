import { SHOW_KEYBOARD } from '../actions/types';

export default function(state = {}, action) {
    switch (action.type) {
        case SHOW_KEYBOARD:
            return action.payload;
        default:
            return state;
    }
}
