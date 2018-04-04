import { DESTINATION_DETAIL } from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case DESTINATION_DETAIL:
      return action.payload;
    default:
      return state;
  }
}
