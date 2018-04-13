import React from 'react'
import UpButton from "../Destination/icons/UpExploreButton.png";
import DownButton from "../Destination/icons/DownExploreButton.png";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { SUBSECTION_LIST_ENTRIES, MediumOrange, shiftArray, ExtraHeavyBlueGreen, HeavyBlue, HeavyOrange, LightOrange, getRandomImage } from "../Constants";

class SubsectionList extends React.Component {
    constructor(props) {
        super(props);
        const { data } = this.props;
        this.state = {
            data,
        }
        this.goUp = this.goUp.bind(this);
        this.goDown = this.goDown.bind(this);
    }
    goUp() {
        let items = this.state.data.slice();
        items = shiftArray(items, 1);
        this.setState({
            data: items,
        });
    }
    goDown() {
        let items = this.state.data.slice();
        items = shiftArray(items, -1);
        this.setState({
            data: items,
        });
    }
    styles = {
        horizontalVerticalCenter: {display: "flex", alignItems: "center", justifyContent: "center"}
    }
    render() {
        const { data } = this.state;
        const { numberOfEntries, sideButtons, sideTitle, mainTitle, imageKey, isImageArray, namespace, renderText } = this.props;
        const itemHeight = `${100 / numberOfEntries}%`;
        return (
            <div style={{width: "100%", height: "100%", display: "flex"}}>
                <div style={{backgroundColor: HeavyOrange, width: "14%", height: "100%", boxShadow: "9.899px 0px 7px 0px rgba(0,0,0,0.6)", zIndex: 1, display: "flex", flexDirection: "column"}}>
                    {sideButtons.length > 0 && sideButtons.map((item, index) => {
                        return (
                            <Link style={{height: "14%"}} key={index} to={item.link}>
                                <img src={item.icon} style={{width: "33%"}} />
                                <div style={{color: "white"}}>{item.title}</div>
                            </Link>
                        );
                    })}
                    <div style={{flex: 1, display: "flex", justifyContent: "center", alignItems: "center", fontSize: "28pt", transform: "rotate(-90deg)", color: "white"}}>
                        {sideTitle}
                    </div>
                </div>

                <div style={{width: "86%", height: "100%"}}>
                    <div style={{height: "8%", backgroundColor: LightOrange, color: "white", letterSpacing: 5, ...this.styles.horizontalVerticalCenter, fontSize: "20pt", letterSpacing: 5}}>{mainTitle}</div>
                    <div style={{height: "6%", backgroundColor: MediumOrange, ...this.styles.horizontalVerticalCenter}} onClick={this.goUp}>
                        <img src={UpButton} style={{width: "5%"}} />
                    </div>
                    <div style={{height: "80%", overflow: "hidden"}}>
                        <div style={{height: "100%", overflowY: "auto", marginRight: "-30px"}}>
                            <div style={{height: "100%", overflow: "auto", paddingRight: "30px"}}>
                                {data.map((item, index) => {
                                    const imageSrc = !!isImageArray ? getRandomImage(item[imageKey]) : item[imageKey];
                                    return(
                                        <Link style={{height: itemHeight, color: "white", display: "flex"}} to={`${namespace}/${item.id}`}>
                                            <div style={{width: "33%", height: "100%"}}>
                                                <img src={imageSrc} style={{width: "100%", height: "100%"}} />
                                            </div>
                                            <div style={{width: "67%", height: "100%", backgroundColor: HeavyBlue, display: "flex", alignItems: "center", paddingLeft: 20}}>
                                                {renderText(item)}
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    <div style={{height: "6%", backgroundColor: MediumOrange, ...this.styles.horizontalVerticalCenter}} onClick={this.goDown}>
                        <img src={DownButton} style={{width: "5%"}} />
                    </div>
                </div>
            </div>
        );
    }
}
SubsectionList.defaultProps = {
    numberOfEntries: SUBSECTION_LIST_ENTRIES,
    sideButtons: [],
    renderText: (item) => item.title.toUpperCase()
}

SubsectionList.propTypes = {
    numberOfEntries: PropTypes.number,
    data: PropTypes.array.isRequired,
    imageKey: PropTypes.string.isRequired,
    isImageArray: PropTypes.bool.isRequired,
    sideButtons: PropTypes.array,
    sideTitle: PropTypes.string.isRequired,
    mainTitle: PropTypes.string.isRequired,
    namespace: PropTypes.string.isRequired,
    renderText: PropTypes.func,
};

export default SubsectionList;