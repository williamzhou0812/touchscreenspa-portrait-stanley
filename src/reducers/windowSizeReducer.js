import {WINDOWS_SIZE} from "../actions/types";

export default function (state = {}, action){
    switch(action.type){
        case WINDOWS_SIZE:
            return action.payload;
        default:
            return state;
    }
}