import React, { Component } from 'react';
import KeyboardedInput from 'react-touch-screen-keyboard';
import 'react-touch-screen-keyboard/lib/Keyboard.css';
import 'react-touch-screen-keyboard/lib/Keyboard.scss';
import lunr from 'lunr';
import './Search.css';
import { documents, idx } from '../App';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
        this.handleValueChange = this.handleValueChange.bind(this);
    }

    handleValueChange(val) {
        this.setState({ value: val }, () => {
            console.log(`${val}`);
            let result = idx.search(`${val}`);
            console.log(result);
            for (var item in result) {
                var ref = result[item].ref;
                //console.log(this.props.searchDocuments.documents[ref]);
            }

            this.props.setSearchResults(result);
        });
    }

    render() {
        return (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgb(221,120,35)',
                    fontSize: '22px',
                    borderWidth: '1px',
                    borderColor: 'rgb(104,199,197)',
                    borderStyle: 'solid solid solid solid'
                }}
            >
                <KeyboardedInput
                    value={this.state.value}
                    onChange={value => {
                        this.handleValueChange(value);
                        this.props.setDisplaySearchResultsBoolean(true);
                    }}
                    opacity={1}
                    placeholder={' Search '}
                    enabled
                    isDraggable={false}
                    inputClassName={'searchInput'}
                />
            </div>
        );
    }
}

const mapStateToProps = ({ searchDocuments }) => {
    return {
        searchDocuments
    };
};

export default connect(mapStateToProps, actions)(Search);
