import { SHOW_KEYBOARD } from './types';

export const setShowKeyboard = showKeyboard => async dispatch => {
    dispatch({
        type: SHOW_KEYBOARD,
        payload: {
            showKeyboard: showKeyboard
        }
    });
};
