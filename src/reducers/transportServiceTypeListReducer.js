import { TRANSPORT_TYPE_LIST } from "../actions/types";

export default function (state = {}, action) {
    switch (action.type) {
        case TRANSPORT_TYPE_LIST:
            return action.payload;
        default:
            return state;
    }
}