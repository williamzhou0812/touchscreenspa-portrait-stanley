import { MAP_LIST } from '../actions/types';

export default function(state = {}, action) {
    switch (action.type) {
        case MAP_LIST:
            return action.payload;
        default:
            return state;
    }
}