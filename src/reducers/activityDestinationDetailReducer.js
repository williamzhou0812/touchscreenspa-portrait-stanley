import { ACTIVITY_DESTINATION_DETAIL, RESET_ACTIVITY_DESTINATION_DETAIL } from '../actions/types';

export default function(state = {}, action) {
    switch (action.type) {
        case ACTIVITY_DESTINATION_DETAIL:
        case RESET_ACTIVITY_DESTINATION_DETAIL:
            return action.payload;
        default:
            return state;
    }
}