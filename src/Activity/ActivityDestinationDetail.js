import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions/activity";
import {
    DECIMAL_RADIX,
    activityNamespace,
    HeavyOrange,
    imageGallery,
    LightBlueButtonBackground,
    MediumOrange,
    LightOrange,
    ExtraHeavyBlueGreen,
    removeHttp
} from "../Constants";
import { Link } from "react-router-dom";
import ActivityIcon from "../MainTab/icons/ACTIVITIES_ICON.png";
import ActivityMapIcon from "../Hotel/icons/HotelsMapIcon.png";
import TourList from "./TourList";
import SidebarMapModel from "../Maps/SidebarMapModel";
import Markdown from "../Markdown";

class ActivityDestinationDetail extends React.Component {
    retrieveData() {
        const id = parseInt(this.props.match.params.id, DECIMAL_RADIX);
        const destid = parseInt(this.props.match.params.destid, DECIMAL_RADIX);
        const { activities } = this.props;
        this.props.fetchActivityDestinationDetail(id, destid, activities);
    }
    componentDidMount() {
        this.retrieveData();
    }
    componentDidUpdate(prevProps) {
        if (prevProps.match.params.destid !== this.props.match.params.destid) {
            this.retrieveData();
        }
    }
    componentWillUnmount() {
        this.props.resetActivityDestinationDetail();
    }
    getPrevLink() {
        const { activity, index } = this.props;
        const { activityDestinationActivity: dests } = activity;
        let output = `${activityNamespace}/${this.props.match.params.id}`;
        if (index === 0) {
            return `${output}/${dests[dests.length - 1].id}`;
        } else {
            return `${output}/${dests[index - 1].id}`;
        }
    }
    getNextLink() {
        const { activity, index } = this.props;
        const { activityDestinationActivity: dests } = activity;
        let output = `${activityNamespace}/${this.props.match.params.id}`;
        if (index === dests.length - 1) {
            return `${output}/${dests[0].id}`;
        } else {
            return `${output}/${dests[index + 1].id}`;
        }
    }
    renderImages() {
        const {
            imageActivityDestination: images
        } = this.props.activityDestination;
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
                    <h1>NO IMAGE FOR THIS ACTIVITY DESTINATION</h1>
                </div>
            );
        }
    }
    renderTours() {
        const {
            tourActivityDestination: tours
        } = this.props.activityDestination;
        if (tours.length > 1) {
            return <TourList data={tours} />;
        } else if (tours.length === 1) {
            const tour = tours[0];
            return (
                <div
                    style={{
                        height: "100%",
                        display: "flex",
                        backgroundColor: "rgb(2,61,66)"
                    }}
                >
                    <div
                        style={{
                            flex: 1,
                            ...this.styles.horizontalVerticalCenter,
                            fontSize: "22px",
                            letterSpacing: "2px",
                            textTransform: "uppercase",
                            paddingTop: "10px"
                        }}
                    >
                        {tour.title}
                    </div>
                    {(tour.phone || tour.website) && (
                        <div
                            style={{
                                flex: 1,
                                ...this.styles.horizontalVerticalCenter,
                                flexDirection: "column",
                                fontSize: "18px",
                                letterSpacing: "2px",
                                overflowWrap: "break-word",
                                wordWrap: "break-word"
                            }}
                        >
                            {tour.phone && <div>PH: {tour.phone}</div>}
                            {tour.website && (
                                <div>W: {removeHttp(tour.website)}</div>
                            )}
                        </div>
                    )}
                    {tour.email && (
                        <div
                            style={{
                                flex: 1,
                                ...this.styles.horizontalVerticalCenter,
                                fontSize: "18px",
                                letterSpacing: "2px",
                                overflowWrap: "break-word",
                                wordWrap: "break-word"
                            }}
                        >
                            E: {tour.email}
                        </div>
                    )}
                </div>
            );
        } else {
            return (
                <div
                    style={{
                        backgroundColor: "rgb(2,61,66)",
                        height: "100%",
                        ...this.styles.horizontalVerticalCenter,
                        fontSize: "22px",
                        letterSpacing: "2px"
                    }}
                >
                    Advertise your business here!
                    <br />
                    For more information, contact:
                    <br />
                    touchscreen@jbg.com.pg
                </div>
            );
        }
    }

    styles = {
        horizontalVerticalCenter: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }
    };

    render() {
        const { activity, activityDestination: dest, status } = this.props;
        const tours =
            dest &&
            dest.tourActivityDestination &&
            dest.tourActivityDestination;
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
                        boxShadow: "9.899px 0px 7px 0px rgba(0,0,0,0.6)",
                        zIndex: 1
                    }}
                >
                    <Link
                        style={{ height: "14%", textDecoration: "none" }}
                        to={activityNamespace}
                    >
                        <div
                            style={{
                                borderStyle: "none none solid none",
                                borderColor: LightOrange,
                                paddingBottom: "35px"
                            }}
                        >
                            <img
                                src={ActivityIcon}
                                style={{ width: "33%", paddingTop: "23px" }}
                                alt="Activity Icon"
                            />
                            <div
                                style={{
                                    color: "white",
                                    fontSize: "16px",
                                    paddingTop: "10px"
                                }}
                            >
                                ALL ACTIVITIES
                            </div>
                        </div>
                    </Link>
                    {status === 200 && (
                        <div>
                            <SidebarMapModel
                                item={{
                                    title: `${activity.title.toUpperCase()} MAP`,
                                    icon: ActivityMapIcon
                                }}
                                mainTitle={activity.title.toUpperCase()}
                                maps={activity.mapActivity}
                            />

                            <Link
                                style={{
                                    height: "14%",
                                    textDecoration: "none"
                                }}
                                to={
                                    activityNamespace +
                                    "/" +
                                    this.props.match.params.id
                                }
                            >
                                <div
                                    style={{
                                        height: "14%",
                                        borderStyle: "none none solid none",
                                        borderColor: LightOrange,
                                        paddingBottom: "38px"
                                    }}
                                >
                                    <img
                                        src={activity.icon}
                                        style={{
                                            width: "33%",
                                            paddingTop: "33px"
                                        }}
                                        alt="Activity Icon"
                                    />
                                    <div
                                        style={{
                                            color: "white",
                                            fontSize: "16px",
                                            paddingTop: "10px"
                                        }}
                                    >
                                        {activity.title.toUpperCase()} AREAS
                                    </div>
                                </div>
                            </Link>
                        </div>
                    )}
                    <div
                        style={{
                            color: "white",
                            height: "60%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: "40pt",
                            fontWeight: 500,
                            letterSpacing: "10px"
                        }}
                    >
                        <span style={{ transform: "rotate(-90deg)" }}>
                            ACTIVITIES
                        </span>
                    </div>
                </div>
                {status === 200 && (
                    <div style={{ width: "86%", height: "100%" }}>
                        {this.renderImages()}
                        <div style={{ height: "58%" }}>
                            <div
                                style={{
                                    height: "16%",
                                    ...this.styles.horizontalVerticalCenter,
                                    backgroundColor: MediumOrange,
                                    paddingTop: "10px",
                                    fontSize: "40px",
                                    letterSpacing: "3px"
                                }}
                            >
                                {activity.title.toUpperCase()}
                            </div>
                            <div style={{ height: "11%", display: "flex" }}>
                                <Link
                                    style={{
                                        flexBasis: "14%",
                                        ...this.styles.horizontalVerticalCenter,
                                        backgroundColor: "rgb(101,199,197)",
                                        color: "white",
                                        fontSize: "20px",
                                        letterSpacing: "3px",
                                        paddingTop: "10px",
                                        textDecoration: "none"
                                    }}
                                    to={this.getPrevLink()}
                                >
                                    PREVIOUS LOCATION
                                </Link>
                                <div
                                    style={{
                                        flexBasis: "72%",
                                        backgroundColor: LightBlueButtonBackground,
                                        fontWrap: "bold",
                                        fontSize: "35px",
                                        letterSpacing: 5,
                                        fontWeight: 500,
                                        paddingTop: "10px",
                                        ...this.styles.horizontalVerticalCenter
                                    }}
                                >
                                    {dest.title.toUpperCase()}
                                </div>
                                <Link
                                    style={{
                                        flexBasis: "14%",
                                        ...this.styles.horizontalVerticalCenter,
                                        backgroundColor: "rgb(101,199,197)",
                                        color: "white",
                                        fontSize: "20px",
                                        letterSpacing: "3px",
                                        paddingTop: "10px",
                                        textDecoration: "none"
                                    }}
                                    to={this.getNextLink()}
                                >
                                    NEXT LOCATION
                                </Link>
                            </div>
                            <div
                                style={{
                                    height: tours.length > 2 ? "36%" : "43%",
                                    backgroundColor: ExtraHeavyBlueGreen,
                                    textAlign: "left",
                                    letterSpacing: "1px",
                                    fontSize: "20px",
                                    lineHeight: "130%",
                                    paddingTop: "30px",
                                    paddingLeft: "30px",
                                    paddingRight: "30px"
                                }}
                            >
                                <Markdown source={dest.description} />
                            </div>
                            <div
                                style={{
                                    height: "7%",
                                    backgroundColor: "rgb(14,154,167)",
                                    ...this.styles.horizontalVerticalCenter,
                                    borderTop: "1px solid rgb(184,223,228)",
                                    borderBottom: "1px solid rgb(184,223,228)",
                                    fontSize: "20px",
                                    letterSpacing: "3px"
                                }}
                            >
                                FOR MORE INFORMATION CONTACT:
                            </div>
                            <div
                                style={{
                                    height: tours.length > 2 ? "30%" : "23%"
                                }}
                            >
                                {this.renderTours()}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

const mapStateToProps = ({ activityList, activityDestinationDetail }) => {
    const { activities } = activityList;
    const {
        activity,
        activityDestination,
        status,
        index
    } = activityDestinationDetail;
    return {
        activities,
        activity,
        activityDestination,
        index,
        status
    };
};
export default connect(
    mapStateToProps,
    actions
)(ActivityDestinationDetail);
