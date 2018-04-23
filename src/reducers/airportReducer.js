import { AIRPORT_INFO } from "../actions/types";

export default (state={}, action) => {
    switch (action.type) {
    case AIRPORT_INFO:
        return action.payload;
    default:
        return state;
    }
}
