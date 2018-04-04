import { WINDOWS_SIZE } from './types';

export const getWindowSize = () => async dispatch => {
    let windowSizeData = {
        winWidth: window.innerWidth,
        winHeight: window.innerHeight
    };
    console.log(windowSizeData);
    dispatch({
        type: WINDOWS_SIZE,
        payload: windowSizeData
    });
};
