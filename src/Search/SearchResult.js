import React, { Component } from 'react';

import './SearchResult.css';
import { connect } from 'react-redux';
import * as actions from '../actions';

class SearchResult extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div
                style={{ width: '100%', height: '54vh' }}
                className="section--bottom--animation"
            >
                SEARCH RESULTS PAGE
            </div>
        );
    }
}

const mapStateToProps = ({ searchDocuments }) => {
    return {
        searchDocuments
    };
};

export default connect(mapStateToProps, actions)(SearchResult);
