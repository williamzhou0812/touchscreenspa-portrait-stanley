import { SEARCH_DOCUMENTS } from './types';

export const setSearchDocuments = documents => async dispatch => {
    dispatch({
        type: SEARCH_DOCUMENTS,
        payload: {
            documents: documents
        }
    });
};
