import React from "react";
import PropTypes from "prop-types";

import Keyboard from "./Keyboard";
import search_icon from "../interface/SearchIcon.png";

import { connect } from "react-redux";
import * as actions from "../actions";
// import { Link } from 'react-router-dom';
// import { searchResultNamespace } from '../Constants';
class KeyboardedInput extends React.Component {
    static propTypes = {
        name: PropTypes.any,
        inputClassName: PropTypes.any,
        keyboardClassName: PropTypes.any,
        placeholder: PropTypes.any,
        value: PropTypes.any.isRequired,
        type: PropTypes.any,
        min: PropTypes.any,
        max: PropTypes.any,
        step: PropTypes.any,
        pattern: PropTypes.any,
        readOnly: PropTypes.any,
        enabled: PropTypes.any,
        defaultKeyboard: PropTypes.any,
        secondaryKeyboard: PropTypes.any,
        opacity: PropTypes.any,
        isDraggable: PropTypes.any,
        isFirstLetterUppercase: PropTypes.any,
        uppercaseAfterSpace: PropTypes.any,
        dataset: PropTypes.any,
        onChange: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleFocusLost = this.handleFocusLost.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.hideKeyboard = this.hideKeyboard.bind(this);

        this.state = {
            showKeyboard: false,
            input: null
        };
        this.props.setShowKeyboard(false);
    }

    componentDidMount() {
        this.input.addEventListener("input", this.handleChange);
    }

    componentWillUnmount() {
        this.input.removeEventListener("input", this.handleChange);
    }

    handleChange(event) {
        this.props.onChange(event.target.value);
    }

    handleFocus() {
        const that = this;
        // Prevent blinking of the keyboard if opaque
        setTimeout(() => {
            if (typeof that.props.value !== "undefined") {
                that.input.focus();
                that.input.select();
                that.input.setSelectionRange(
                    that.props.value.length,
                    that.props.value.length
                );
                that.setState({ ...this.state, showKeyboard: true }, () => {
                    this.props.setShowKeyboard(true);
                });
            }
        }, 0);
    }

    handleFocusLost() {
        const that = this;
        setTimeout(() => {
            if (
                !document.activeElement.classList.contains("keyboard-button") &&
                !document.activeElement.classList.contains("keyboard") &&
                !document.activeElement.classList.contains("keyboard-row")
            ) {
                that.setState({ ...that.state, showKeyboard: false }, () => {
                    this.props.setShowKeyboardOutAnimation(true);
                    this.props.setShowSearchBarOutAnimation(true);

                    setTimeout(() => {
                        this.props.setShowKeyboard(false);
                        this.props.setShowSearchBarBoolean(false);
                    }, 0);
                });
            }
        }, 0);
    }

    hideKeyboard() {
        this.setState({ ...this.state, showKeyboard: false }, () => {
            this.props.setShowKeyboardOutAnimation(true);
            this.props.setShowSearchBarOutAnimation(true);

            setTimeout(() => {
                this.props.setShowKeyboard(false);
                this.props.setShowSearchBarBoolean(false);
            }, 800);
        });
    }

    render() {
        return (
            <div>
                <div
                    className={
                        this.props.showSearchBarOutAnimation.boolean
                            ? "search--bar--out--animation"
                            : "search--bar--in--animation"
                    }
                    style={{
                        opacity: this.props.showSearchBarOutAnimation.boolean
                            ? 0
                            : 1
                    }}
                >
                    <img
                        src={search_icon}
                        style={{
                            height: "45px",
                            paddingRight: "30px"
                        }}
                        alt="search button"
                    />
                    <input
                        name={this.props.name}
                        className={this.props.inputClassName}
                        placeholder={this.props.placeholder}
                        value={this.props.value}
                        type={this.props.type}
                        onFocus={this.handleFocus}
                        onBlur={this.handleFocusLost}
                        min={this.props.min}
                        max={this.props.max}
                        step={this.props.step}
                        pattern={this.props.pattern}
                        onChange={this.handleChange}
                        readOnly={this.props.readOnly === true}
                        ref={e => {
                            this.input = e;
                        }}
                        style={{
                            lineHeight: "normal",
                            paddingTop: "5px"
                        }}
                    />
                </div>
                {this.props.enabled && this.props.readOnly !== true && (
                    <Keyboard
                        hideKeyboard={this.hideKeyboard}
                        defaultKeyboard={this.props.defaultKeyboard}
                        secondaryKeyboard={this.props.secondaryKeyboard}
                        inputNode={this.input}
                        dataset={this.props.dataset}
                        opacity={this.props.opacity}
                        isDraggable={this.props.isDraggable}
                        isFirstLetterUppercase={
                            this.props.isFirstLetterUppercase
                        }
                        uppercaseAfterSpace={this.props.uppercaseAfterSpace}
                        keyboardClassName={this.props.keyboardClassName}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = ({
    showKeyboard,
    showSearchBarBoolean,
    showSearchBarOutAnimation
}) => {
    return {
        showKeyboard,
        showSearchBarBoolean,
        showSearchBarOutAnimation
    };
};

export default connect(
    mapStateToProps,
    actions
)(KeyboardedInput);
