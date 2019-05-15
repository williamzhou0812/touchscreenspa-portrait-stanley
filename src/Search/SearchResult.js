import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./SearchResult.css";
import { connect } from "react-redux";
import * as actions from "../actions";
import { HeavyOrange } from "../Constants";
import { map, isEmpty } from "lodash";
import UpButton from "../Destination/icons/UpExploreButton.png";
import DownButton from "../Destination/icons/DownExploreButton.png";
import { LightOrange } from "../Constants";

class SearchResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchResult: null,
            currentSearchResult: null,
            searchDocuments: null,
            currentsearchDocuments: null
        };
    }
    styles = {
        horizontalVerticalCenter: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        },
        upArrow: {
            borderStyle: "none none solid none",
            borderColor: LightOrange,
            height: "14%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        },
        downArrow: {
            borderStyle: "solid none none none",
            borderColor: LightOrange,
            height: "14%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }
    };

    componentWillReceiveProps(nextProps) {
        this.setState({
            searchResult: nextProps.searchResult.results,
            currentSearchResult: nextProps.searchResult.results
        });
    }

    componentWillUnmount() {
        this.props.resetSearchResults();
    }

    processDirectoryOrder(action) {
        const { currentSearchResult } = this.state;
        let processedSearchResult = [...currentSearchResult];
        if (action === "down") {
            //get the last element via pop() and add to the begining of the array via unshift()
            processedSearchResult.unshift(processedSearchResult.pop());
            this.setState({
                currentSearchResult: processedSearchResult
            });
        }

        if (action === "up") {
            //get the first element via shift() and add to the end of the array via push()
            processedSearchResult.push(processedSearchResult.shift());
            this.setState({
                currentSearchResult: processedSearchResult
            });
        }
    }

    renderSearchResultItem() {
        const { searchDocuments } = this.props;
        const { currentSearchResult } = this.state;

        if (!isEmpty(currentSearchResult)) {
            return map(currentSearchResult, item => {
                let image = {};
                if (!isEmpty(searchDocuments.documents[item.ref].image)) {
                    image = {
                        backgroundImage:
                            "url(" +
                            searchDocuments.documents[item.ref].image +
                            ")",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        backgroundPosition: "center"
                    };
                }

                return (
                    <Link
                        to={searchDocuments.documents[item.ref].link}
                        style={{ textDecoration: "none", color: "white" }}
                        onClick={() => {
                            this.props.setShowKeyboardOutAnimation(true);
                            this.props.setShowSearchBarOutAnimation(true);
                            setTimeout(() => {
                                this.props.setShowKeyboard(false);
                                this.props.setShowSearchBarBoolean(false);
                            }, 800);
                            this.props.setDisplaySearchResultsBoolean(false);
                        }}
                    >
                        <div
                            key={`${item.ref}`}
                            className="searchResultContainer--content--resultItem"
                        >
                            {!isEmpty(
                                searchDocuments.documents[item.ref].image
                            ) ? (
                                <div
                                    className="searchResultContainer--content--resultItem--image"
                                    style={image}
                                />
                            ) : (
                                <div
                                    className="searchResultContainer--content--resultItem--image"
                                    style={this.styles.horizontalVerticalCenter}
                                >
                                    No Image
                                </div>
                            )}

                            <div className="searchResultContainer--content--resultItem--content">
                                <p className="searchResultContainer--content--resultItem--content--title">
                                    {searchDocuments.documents[item.ref].title}
                                </p>
                                <p className="searchResultContainer--content--resultItem--content--description">
                                    {searchDocuments.documents[item.ref].text
                                        .length > 300
                                        ? `${searchDocuments.documents[
                                              item.ref
                                          ].text.substring(0, 300)}...`
                                        : searchDocuments.documents[item.ref]
                                              .text}
                                </p>
                            </div>
                        </div>
                    </Link>
                );
            });
        } else {
            return (
                <div className="searchResultContainer--content--noResultPage">
                    {!isEmpty(currentSearchResult) ? (
                        <p>No results found</p>
                    ) : (
                        <p>Start search by entering keywords</p>
                    )}
                </div>
            );
        }
    }
    render() {
        return (
            <div
                style={{ width: "100%", height: "54vh", display: "flex" }}
                className="searchResult--right--animation"
            >
                <div
                    onClick={this.returnFromExplore}
                    style={{
                        backgroundColor: HeavyOrange,
                        width: "14%",
                        height: "100%",
                        boxShadow: "9.899px 0px 7px 0px rgba(0,0,0,0.6)",
                        zIndex: 1
                    }}
                >
                    <div
                        style={{
                            height: "86%",
                            ...this.styles.horizontalVerticalCenter,
                            color: "white",
                            fontSize: "40pt",
                            fontWeight: 500,
                            letterSpacing: "10px"
                        }}
                    >
                        <span style={{ transform: "rotate(-90deg)" }}>
                            SEARCH
                        </span>
                    </div>
                </div>

                <div
                    style={{ width: "86%", height: "100%" }}
                    className="searchResultContainer"
                >
                    <div className="searchResultContainer--title">
                        SEARCH RESULTS
                    </div>

                    <div
                        className="searchResultContainer--up"
                        style={{
                            ...this.styles.horizontalVerticalCenter
                        }}
                        onClick={() => {
                            if (!isEmpty(this.state.currentSearchResult)) {
                                this.processDirectoryOrder("up");
                            }
                        }}
                    >
                        <img src={UpButton} style={{ width: "5%" }} alt="Up" />
                    </div>

                    <div className="searchResultContainer--content">
                        {this.renderSearchResultItem()}
                    </div>

                    <div
                        className="searchResultContainer--down"
                        style={{
                            ...this.styles.horizontalVerticalCenter
                        }}
                        onClick={() => {
                            if (!isEmpty(this.state.currentSearchResult)) {
                                this.processDirectoryOrder("down");
                            }
                        }}
                    >
                        <img
                            src={DownButton}
                            style={{ width: "5%" }}
                            alt="Up"
                        />
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

export default connect(
    mapStateToProps,
    actions
)(SearchResult);
