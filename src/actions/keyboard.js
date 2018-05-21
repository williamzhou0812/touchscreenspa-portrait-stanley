import { SHOW_KEYBOARD, SHOW_KEYBOARD_OUT_ANIMATION } from './types';

export const setShowKeyboard = showKeyboard => async dispatch => {
    dispatch({
        type: SHOW_KEYBOARD,
        payload: {
            showKeyboard: showKeyboard
        }
    });
};
export const setShowKeyboardOutAnimation = boolean => async dispatch => {
    dispatch({
        type: SHOW_KEYBOARD_OUT_ANIMATION,
        payload: {
            boolean: boolean
        }
    });
};
