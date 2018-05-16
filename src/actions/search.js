import {
    SEARCH_DOCUMENTS,
    DISPLAY_SEARCH_RESULTS_PAGE,
    SEARCH_RESULTS
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