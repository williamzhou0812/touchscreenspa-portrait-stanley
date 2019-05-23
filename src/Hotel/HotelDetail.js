import React from "react";
import { connect } from "react-redux";
import {
    DECIMAL_RADIX,
    accomodationNamespace,
    HeavyOrange,
    LightBlueButtonBackground,
    imageGallery,
    renderRating,
    ExtraHeavyBlueGreen,
    LightOrange
} from "../Constants";
import { Link } from "react-router-dom";
import AllAreasIcon from "../Destination/icons/AllAreas.png";
import HotelListIcon from "./icons/HotelListIcon.png";
import MapModal from "../Maps/MapModal";
import Markdown from "../Markdown";

class HotelDetail extends React.Component {
    destIndex = -1;
    constructor(props) {
        super(props);
        const accommodation = { ...this.getHotelDetail() };
        this.state = {
            accommodation
        };
    }

    getHotelDetail() {
        const { accommodations } = this.props;
        const destid = parseInt(this.props.match.params.destid, DECIMAL_RADIX);
        const accoid = parseInt(this.props.match.params.accoid, DECIMAL_RADIX);
        let destIndex;
        if (this.destIndex > -1) {
            destIndex = this.destIndex;
        } else {
            destIndex = accommodations.findIndex(element => {
                return element.id === destid;
            });
            this.destIndex = destIndex;
        }
        const accoIndex = accommodations[
            destIndex
        ].accomodationDestination.findIndex(element => {
            return element.id === accoid;
        });
        return accommodations[destIndex].accomodationDestination[accoIndex];
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.accoid !== prevProps.match.params.accoid) {
            this.setState({
                accommodation: { ...this.getHotelDetail() }
            });
        }
    }

    styles = {
        horizontalVerticalCenter: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }
    };

    renderImages() {
        const { imageAccomodation: images } = this.state.accommodation;
        if (images.length > 1) {
            return imageGallery(images, "100%", "22.68vh");
        } else if (images.length === 1) {
            return (
                <div
                    style={{
                        height: "42%",
                        backgroundImage: `url(${images[0].imageFile})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center"
                    }}
                />
            );
        } else {
            return (
                <div
                    style={{
                        height: "42%",
                        backgroundColor: HeavyOrange,
                        ...this.styles.horizontalVerticalCenter
                    }}
                >
                    <h1>NO IMAGE FOR THIS HOTEL</h1>
                </div>
            );
        }
    }

    renderMaps() {
        const { mapAccomodation: maps } = this.state.accommodation;
        if (maps.length === 2) {
            const map1 = maps[0];
            const map2 = maps[1];
            return (
                <div>
                    {/* <div
                        style={{
                            backgroundColor: LightBlueButtonBackground,
                            width: '100%',
                            height: '50px',
                            marginTop: '5%',
                            marginBottom: '5%',
                            borderRadius: '5px',
                            fontSize: '20px',
                            fontWeight: 500,
                            boxShadow: '0px 0px 10px 1px rgba(0,0,0,0.5)',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        {map1.title.toUpperCase()}
                    </div>
                    <div
                        style={{
                            backgroundColor: LightBlueButtonBackground,
                            width: '100%',
                            height: '50px',
                            marginTop: '5%',
                            marginBottom: '5%',
                            borderRadius: '5px',
                            fontSize: '20px',
                            fontWeight: 500,
                            boxShadow: '0px 0px 10px 1px rgba(0,0,0,0.5)',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        {map2.title.toUpperCase()}
                    </div> */}
                    <MapModal
                        title={map1.title}
                        buttonStyle={{
                            backgroundColor: LightBlueButtonBackground,
                            width: "100%",
                            height: "50px",
                            marginTop: "5%",
                            marginBottom: "5%",
                            borderRadius: "5px",
                            fontSize: "20px",
                            fontWeight: 500,
                            boxShadow: "0px 0px 10px 1px rgba(0,0,0,0.5)",
                            color: "white",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                        textStyle={{}}
                        mapImage={map1.mapImage}
                        rootStyle={{}}
                    />
                    <MapModal
                        title={map2.title}
                        buttonStyle={{
                            backgroundColor: LightBlueButtonBackground,
                            width: "100%",
                            height: "50px",
                            marginTop: "5%",
                            marginBottom: "5%",
                            borderRadius: "5px",
                            fontSize: "20px",
                            fontWeight: 500,
                            boxShadow: "0px 0px 10px 1px rgba(0,0,0,0.5)",
                            color: "white",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                        textStyle={{}}
                        mapImage={map2.mapImage}
                        rootStyle={{}}
                    />
                </div>
            );
        } else if (maps.length === 1) {
            const map1 = maps[0];
            return (
                // <div
                //     style={{
                //         backgroundColor: LightBlueButtonBackground,
                //         width: '100%',
                //         height: '50px',
                //         marginTop: '5%',
                //         marginBottom: '5%',
                //         borderRadius: '5px',
                //         fontSize: '20px',
                //         fontWeight: 500,
                //         boxShadow: '0px 0px 10px 1px rgba(0,0,0,0.5)',
                //         color: 'white',
                //         display: 'flex',
                //         alignItems: 'center',
                //         justifyContent: 'center'
                //     }}
                // >
                //     {map1.title.toUpperCase()}
                // </div>
                <MapModal
                    title={map1.title}
                    buttonStyle={{
                        backgroundColor: LightBlueButtonBackground,
                        width: "100%",
                        height: "50px",
                        marginTop: "5%",
                        marginBottom: "5%",
                        borderRadius: "5px",
                        fontSize: "20px",
                        fontWeight: 500,
                        boxShadow: "0px 0px 10px 1px rgba(0,0,0,0.5)",
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                    textStyle={{}}
                    mapImage={map1.mapImage}
                    rootStyle={{}}
                />
            );
        } else {
            return <div />;
        }
    }

    render() {
        const { accommodations } = this.props;
        const destName =
            this.destIndex > -1 &&
            accommodations[this.destIndex].title.toUpperCase();
        const destID = this.destIndex > -1 && accommodations[this.destIndex].id;
        const { accommodation } = this.state;
        return (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    color: "white"
                }}
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
                            height: "14%",
                            textDecoration: "none"
                        }}
                        to={accomodationNamespace}
                    >
                        <div
                            style={{
                                borderStyle: "none none solid none",
                                borderColor: LightOrange,
                                paddingBottom: "35px"
                            }}
                        >
                            <img
                                src={AllAreasIcon}
                                style={{ width: "33%", paddingTop: "33px" }}
                                alt="All Areas Icon"
                            />
                            <div style={{ color: "white", fontSize: "16px" }}>
                                ALL AREAS
                            </div>
                        </div>
                    </Link>
                    <Link
                        style={{
                            height: "14%",
                            textDecoration: "none"
                        }}
                        to={`${accomodationNamespace}/${destID}`}
                    >
                        <div
                            style={{
                                borderStyle: "none none solid none",
                                borderColor: LightOrange,
                                paddingBottom: "28px"
                            }}
                        >
                            <img
                                src={HotelListIcon}
                                style={{ width: "33%", paddingTop: "33px" }}
                                alt="Hotel List Icon"
                            />
                            <div style={{ color: "white", fontSize: "16px" }}>
                                {destName} HOTELS
                            </div>
                        </div>
                    </Link>
                    <div
                        style={{
                            color: "white",
                            fontSize: "40pt",
                            fontWeight: 500,
                            letterSpacing: "10px",
                            height: "72%",
                            ...this.styles.horizontalVerticalCenter
                        }}
                    >
                        <span style={{ transform: "rotate(-90deg)" }}>
                            HOTELS
                        </span>
                    </div>
                </div>
                {!!accommodation && (
                    <div style={{ width: "86%", height: "100%" }}>
                        {this.renderImages()}
                        <div style={{ height: "58%" }}>
                            <div style={{ height: "26%", display: "flex" }}>
                                <div
                                    style={{
                                        flexBasis: "33%",
                                        backgroundImage: `url(${
                                            accommodation.logo
                                        })`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center"
                                    }}
                                />
                                <div
                                    style={{
                                        flex: 1,
                                        backgroundColor: LightBlueButtonBackground
                                    }}
                                >
                                    <div
                                        style={{
                                            height: "50%",
                                            display: "flex",
                                            alignItems: "flex-end",
                                            textAlign: "left",
                                            fontSize: "30px",
                                            lineHeight: "115%",
                                            letterSpacing: "3px",
                                            paddingLeft: 35
                                        }}
                                    >
                                        {accommodation.title.toUpperCase()}
                                    </div>
                                    <div
                                        style={{
                                            height: "50%",
                                            display: "flex",
                                            alignItems: "flex-start",
                                            textAlign: "left",
                                            fontSize: "30px",
                                            lineHeight: "115%",
                                            letterSpacing: "3px",
                                            paddingLeft: 35
                                        }}
                                    >
                                        {renderRating(accommodation.rating, 38)}
                                    </div>
                                </div>
                            </div>
                            <div
                                style={{
                                    height: "74%",
                                    display: "flex",
                                    backgroundColor: ExtraHeavyBlueGreen
                                }}
                            >
                                <div
                                    style={{
                                        height: "100%",
                                        overflow: "hidden",
                                        width: "50%"
                                    }}
                                >
                                    <div
                                        style={{
                                            height: "100%",
                                            paddingTop: 20,
                                            paddingLeft: 35,
                                            paddingRight: 20,
                                            fontSize: "19px",
                                            lineHeight: "115%",
                                            letterSpacing: "1px",
                                            textAlign: "left",
                                            overflow: "auto",
                                            maxHeight: "100vh",
                                            marginRight: "-40px"
                                        }}
                                    >
                                        <div
                                            style={{
                                                height: "100%",
                                                overflow: "auto",
                                                paddingRight: "40px"
                                            }}
                                        >
                                            <Markdown
                                                source={
                                                    accommodation.description
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div
                                    style={{
                                        width: "50%",
                                        paddingTop: 20,
                                        paddingLeft: 35,
                                        paddingRight: 20,
                                        fontSize: "20px",
                                        lineHeight: "130%",
                                        letterSpacing: "1px",
                                        textAlign: "left"
                                    }}
                                >
                                    <div>CALL TODAY: {accommodation.phone}</div>
                                    <div>WEB: {accommodation.website}</div>
                                    <div>EMAIL: {accommodation.email}</div>
                                    <div>LOCATION: {accommodation.address}</div>
                                    {this.renderMaps()}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

const mapStateToProps = ({ accommodationList }) => {
    const { accommodations } = accommodationList;
    return {
        accommodations
    };
};

export default connect(
    mapStateToProps,
    null
)(HotelDetail);
