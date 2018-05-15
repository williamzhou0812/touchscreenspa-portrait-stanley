import { SEARCH_DOCUMENTS } from '../actions/types';
export default (state = {}, action) => {
    switch (action.type) {
        case SEARCH_DOCUMENTS:
            return action.payload;
        default:
            return state;
    }
};
