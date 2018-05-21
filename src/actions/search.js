import {
    SEARCH_DOCUMENTS,
    DISPLAY_SEARCH_RESULTS_PAGE,
    SEARCH_RESULTS,
    SHOW_SEARCH_BAR,
    RESET_SEARCH_RESULTS,
    SHOW_SEARCH_BAR_OUT_ANIMATION
} from './types';

export const setSearchDocuments = documents => async dispatch => {
    dispatch({
        type: SEARCH_DOCUMENTS,
        payload: {
            documents: documents
        }
    });
};

export const setDisplaySearchResultsBoolean = boolean => async dispatch => {
    dispatch({
        type: DISPLAY_SEARCH_RESULTS_PAGE,
        payload: {
            boolean: boolean
        }
    });
};

export const setSearchResults = results => async dispatch => {
    dispatch({
        type: SEARCH_RESULTS,
        payload: {
            results: results
        }
    });
};

export const setShowSearchBarBoolean = boolean => async dispatch => {
    dispatch({
        type: SHOW_SEARCH_BAR,
        payload: {
            boolean: boolean
        }
    });
};

export const resetSearchResults = () => async dispatch => {
    dispatch({
        type: RESET_SEARCH_RESULTS,
        payload: {}
    });
};

export const setShowSearchBarOutAnimation = boolean => async dispatch => {
    dispatch({
        type: SHOW_SEARCH_BAR_OUT_ANIMATION,
        payload: { boolean: boolean }
    });
};
