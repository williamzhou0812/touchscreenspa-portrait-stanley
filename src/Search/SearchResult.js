import React, { Component } from 'react';

import './SearchResult.css';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { HeavyOrange } from '../Constants';
import _ from 'lodash';

class SearchResult extends Component {
    constructor(props) {
        super(props);
    }
    styles = {
        horizontalVerticalCenter: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }
    };

    renderSearchResultItem() {
        const { searchResult, searchDocuments } = this.props;
        if (!_.isEmpty(searchResult.results)) {
            return _.map(searchResult.results, item => {
                return (
                    <div className="searchResultContainer--content--resultItem">
                        <p>{searchDocuments.documents[item.ref].title}</p>
                        <p>{searchDocuments.documents[item.ref].text}</p>
                    </div>
                );
            });
        } else {
            return (
                <div className="searchResultContainer--content--noResultPage">
                    <p>Sorry, No search results for you !</p>
                </div>
            );
        }
    }
    render() {
        return (
            <div
                style={{ width: '100%', height: '54vh', display: 'flex' }}
                className="section--bottom--animation"
            >
                <div
                    onClick={this.returnFromExplore}
                    style={{
                        backgroundColor: HeavyOrange,
                        width: '14%',
                        height: '100%',
                        boxShadow: '9.899px 0px 7px 0px rgba(0,0,0,0.6)',
                        zIndex: 1
                    }}
                >
                    <div
                        style={{
                            height: '86%',
                            ...this.styles.horizontalVerticalCenter,
                            color: 'white',
                            fontSize: '40pt',
                            fontWeight: 500,
                            letterSpacing: '10px'
                        }}
                    >
                        <span style={{ transform: 'rotate(-90deg)' }}>
                            SEARCH
                        </span>
                    </div>
                </div>

                <div
                    style={{ width: '86%', height: '100%' }}
                    className="searchResultContainer"
                >
                    <div className="searchResultContainer--title">
                        SEARCH RESULTS
                    </div>

                    <div className="searchResultContainer--up">Up Arrow</div>

                    <div className="searchResultContainer--content">
                        {this.renderSearchResultItem()}
                    </div>

                    <div className="searchResultContainer--down">
                        Down Arrow
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ searchResult, searchDocuments }) => {
    return {
        searchResult,
        searchDocuments
    };
};

export default connect(mapStateToProps, actions)(SearchResult);
