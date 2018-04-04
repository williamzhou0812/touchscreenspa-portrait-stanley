import {
    RETRIEVE_HANDOVER_VIDEO,
    RESET_HANDOVER_VIDEO
} from '../actions/types';

export default function(state = {}, action) {
    switch (action.type) {
        case RETRIEVE_HANDOVER_VIDEO:
        case RESET_HANDOVER_VIDEO:
            return action.payload;
        default:
            return state;
    }
}
