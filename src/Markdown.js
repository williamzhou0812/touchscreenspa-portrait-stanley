import React from "react";
import Remarkable from "remarkable";
import Parser from "html-react-parser";
import PropTypes from "prop-types";

const Markdown = ({ source }) => {
    let md = new Remarkable();
    md.inline.ruler.enable(["ins"]);
    if (Boolean(source)) {
        return Parser(md.render(source));
    } else {
        return <span>NIL</span>;
    }
};

Markdown.propTypes = {
    source: PropTypes.string.isRequired
};

export default Markdown;
