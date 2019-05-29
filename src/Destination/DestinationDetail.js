import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../actions/destination";
import AllAreas from "./icons/AllAreas.png";
import BackIcon from "./icons/BackIcon.png";
import {
    HeavyOrange,
    destinationNamespace,
    LightBlueButtonBackground,
    ExtraHeavyBlueGreen,
    imageGallery,
    LightOrange
} from "../Constants";
import ExploreList from "./ExploreList";
import MapModal from "../Maps/MapModal";
import Markdown from "../Markdown";

class DestinationDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            explore: false
        };
        this.goToExplore = this.goToExplore.bind(this);
        this.returnFromExplore = this.returnFromExplore.bind(this);
    }
    retrieveData() {
        const { destinations } = this.props.destinationList;
        this.props.fetchDestinationDetail(
            this.props.match.params.id,
            destinations
        );
    }
    componentDidMount() {
        this.retrieveData();
    }
    componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            this.retrieveData();
        }
    }
    goToExplore() {
        this.setState({ explore: true });
    }
    returnFromExplore() {
        this.setState({ explore: false });
    }
    styles = {
        horizontalVerticalCenter: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        },
        mapButtonStyle: {
            width: "100%",
            height: "100%",
            marginLeft: 10,
            marginTop: "5%",
            marginBottom: "5%",
            borderRadius: "5px",
            fontSize: "20px",
            fontWeight: 500,
            boxShadow: "0px 0px 10px 1px rgba(0,0,0,0.5)",
            backgroundColor: LightBlueButtonBackground,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        },
        mapButtonTextStyle: {
            paddingTop: "5px"
        }
    };

    render() {
        const { destination, status } = this.props.destinationDetail;
        const { explore } = this.state;
        if (explore) {
            return (
                <div
                    style={{ width: "100%", height: "100%", display: "flex" }}
                    className="section--bottom--animation"
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
                        <div style={{ height: "14%" }}>
                            <div
                                style={{
                                    height: "100%",
                                    borderStyle: "none none solid none",
                                    borderColor: LightOrange,
                                    ...this.styles.horizontalVerticalCenter,
                                    flexDirection: "column"
                                }}
                            >
                                <img
                                    src={BackIcon}
                                    style={{ width: "33%", marginBottom: -10 }}
                                    alt="Back To Overview Icon"
                                />
                                <div
                                    style={{ color: "white", fontSize: "14pt" }}
                                >
                                    BACK TO OVERVIEW
                                </div>
                            </div>
                        </div>
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
                                EXPLORE
                            </span>
                        </div>
                    </div>
                    {!!destination && status === 200 && (
                        <div style={{ width: "86%", height: "100%" }}>
                            <div
                                style={{
                                    height: "8%",
                                    backgroundColor: LightOrange,
                                    color: "white",
                                    letterSpacing: 10,
                                    ...this.styles.horizontalVerticalCenter,
                                    fontSize: "40pt",
                                    paddingTop: 20
                                }}
                            >
                                {destination.title}
                            </div>
                            <div style={{ height: "92%" }}>
                                <ExploreList data={destination.exploreData} />
                            </div>
                        </div>
                    )}
                </div>
            );
        } else {
            return (
                <div
                    style={{ width: "100%", height: "100%", display: "flex" }}
                    className="section--bottom--animation"
                >
                    <div
                        style={{
                            backgroundColor: HeavyOrange,
                            width: "14%",
                            height: "100%",
                            boxShadow: "9.899px 0px 7px 0px rgba(0,0,0,0.6)",
                            zIndex: 1
                        }}
                    >
                        <Link
                            style={{
                                height: "18%",
                                textDecoration: "none"
                            }}
                            to={destinationNamespace}
                        >
                            <div
                                style={{
                                    borderStyle: "none none solid none",
                                    borderColor: LightOrange,
                                    paddingBottom: "30px"
                                }}
                            >
                                <img
                                    src={AllAreas}
                                    style={{ width: "33%", paddingTop: "30px" }}
                                    alt="All Areas Icon"
                                />
                                <div
                                    style={{
                                        color: "white",
                                        fontSize: "20px",
                                        letterSpacing: "2px"
                                    }}
                                >
                                    ALL AREAS
                                </div>
                            </div>
                        </Link>

                        <div
                            style={{
                                color: "white",
                                height: "86%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                fontSize: "40pt",
                                fontWeight: 500,
                                letterSpacing: "10px"
                            }}
                        >
                            <span style={{ transform: "rotate(-90deg)" }}>
                                DESTINATIONS
                            </span>
                        </div>
                    </div>

                    {!!destination && status === 200 && (
                        <div style={{ width: "86%", height: "100%" }}>
                            <div style={{ height: "50%" }}>
                                {destination.imageDestination.length > 1 ? (
                                    <div>
                                        {imageGallery(
                                            destination.imageDestination,
                                            "100%",
                                            "27vh"
                                        )}
                                    </div>
                                ) : (
                                    <img
                                        src={
                                            destination.imageDestination[0]
                                                .imageFile
                                        }
                                        style={{
                                            width: "100%",
                                            height: "100%"
                                        }}
                                        alt=""
                                    />
                                )}
                            </div>
                            <div
                                style={{
                                    height: "50%",
                                    backgroundColor: ExtraHeavyBlueGreen,
                                    paddingLeft: 35,
                                    color: "white"
                                }}
                            >
                                <div
                                    style={{
                                        height: "20%",
                                        display: "flex",
                                        alignItems: "center",
                                        fontSize: "40pt",
                                        fontWeight: 500,
                                        letterSpacing: "10px"
                                    }}
                                >
                                    {destination.title}
                                </div>
                                <div
                                    style={{
                                        height: "80%",
                                        display: "flex"
                                    }}
                                >
                                    <div
                                        style={{
                                            width: "50%",
                                            height: "100%",
                                            textAlign: "left",
                                            fontSize: "20px",
                                            lineHeight: "130%",
                                            letterSpacing: "1px"
                                        }}
                                    >
                                        <Markdown
                                            source={destination.description}
                                        />
                                    </div>
                                    <div
                                        style={{
                                            width: "50%",
                                            height: "100%",
                                            marginLeft: 10
                                        }}
                                    >
                                        <div
                                            style={{
                                                marginLeft: 10,
                                                fontSize: "20px",
                                                lineHeight: "130%",
                                                textAlign: "left",
                                                letterSpacing: "1px"
                                            }}
                                        >
                                            {destination.province && (
                                                <React.Fragment>
                                                    <span
                                                        style={{
                                                            fontWeight: 500
                                                        }}
                                                    >
                                                        PROVINCE:
                                                    </span>{" "}
                                                    {destination.province}
                                                </React.Fragment>
                                            )}
                                        </div>
                                        <div
                                            style={{
                                                marginLeft: 10,
                                                fontSize: "20px",
                                                lineHeight: "130%",
                                                textAlign: "left",
                                                letterSpacing: "1px",
                                                paddingTop: "10px"
                                            }}
                                        >
                                            {destination.airport && (
                                                <React.Fragment>
                                                    <span
                                                        style={{
                                                            fontWeight: 500
                                                        }}
                                                    >
                                                        CLOSEST AIRPORT:
                                                    </span>{" "}
                                                    {destination.airport}
                                                </React.Fragment>
                                            )}
                                        </div>
                                        <div
                                            onClick={this.goToExplore}
                                            style={{
                                                height: "28%",
                                                width: "80%",
                                                backgroundColor: HeavyOrange,
                                                marginLeft: 10,
                                                marginTop: "5%",
                                                marginBottom: "5%",
                                                borderRadius: "5px",
                                                fontSize: "20px",
                                                fontWeight: 500,
                                                boxShadow:
                                                    "0px 0px 10px 1px rgba(0,0,0,0.5)",
                                                ...this.styles
                                                    .horizontalVerticalCenter
                                            }}
                                        >
                                            <span
                                                style={
                                                    this.styles
                                                        .mapButtonTextStyle
                                                }
                                            >
                                                EXPLORE
                                            </span>
                                        </div>
                                        {destination.mapDestination.length >
                                            0 && (
                                            <div
                                                style={{
                                                    height: "13%",
                                                    width: "80%"
                                                }}
                                            >
                                                <MapModal
                                                    title={
                                                        destination
                                                            .mapDestination[0]
                                                            .title
                                                    }
                                                    buttonStyle={
                                                        this.styles
                                                            .mapButtonStyle
                                                    }
                                                    textStyle={
                                                        this.styles
                                                            .mapButtonTextStyle
                                                    }
                                                    mapImage={
                                                        destination
                                                            .mapDestination[0]
                                                            .mapImage
                                                    }
                                                />
                                            </div>
                                        )}
                                        {destination.mapDestination.length >
                                            1 && (
                                            <div
                                                style={{
                                                    height: "13%",
                                                    width: "80%"
                                                }}
                                            >
                                                <MapModal
                                                    title={
                                                        destination
                                                            .mapDestination[1]
                                                            .title
                                                    }
                                                    buttonStyle={
                                                        this.styles
                                                            .mapButtonStyle
                                                    }
                                                    textStyle={
                                                        this.styles
                                                            .mapButtonTextStyle
                                                    }
                                                    mapImage={
                                                        destination
                                                            .mapDestination[1]
                                                            .mapImage
                                                    }
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            );
        }
    }
}

const mapStateToProps = ({ destinationList, destinationDetail }) => {
    return {
        destinationList,
        destinationDetail
    };
};

export default connect(
    mapStateToProps,
    actions
)(DestinationDetail);
