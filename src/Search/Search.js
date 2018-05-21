import React, { Component } from 'react';
import KeyboardedInput from '../Keyboard';
import '../Keyboard/Keyboard.css';
import lunr from 'lunr';
import './Search.css';
import { idx } from '../App';
import { connect } from 'react-redux';
import * as actions from '../actions';
import _ from 'lodash';

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
            if (!_.isEmpty(val)) {
                let result = !val.replace(/\s/g, '').length
                    ? idx.search(`${val}`)
                    : idx.search(`${val}~2`);
                for (let item in result) {
                    let ref = result[item].ref;
                }
                this.props.setSearchResults(result);
            }
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
                    backgroundColor: 'rgb(243, 158, 49)',
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
                    placeholder={'Type to begin search'}
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
