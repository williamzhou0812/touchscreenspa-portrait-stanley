import React from "react";
import {
    imageGallery,
    HeavyOrange,
    ExtraHeavyBlueGreen,
    LightBlueButtonBackground,
    removeHttp,
    serviceNamespace,
    LightOrange
} from "../Constants";
import { Link } from "react-router-dom";
import ServiceTypesIcon from "../Dining/icons/RestaurantListIcon.png";
import MapModal from "../Maps/MapModal";
import Markdown from "../Markdown";

class ServiceBranch extends React.Component {
    constructor(props) {
        super(props);
        const { data, serviceTypeData, id } = this.props;
        const branches = data[serviceTypeData.listKey];
        let branchIndex = 0;
        if (id) {
            branchIndex = branches.findIndex(branch => {
                return branch.id === id;
            });
        }
        this.state = {
            branches,
            branchIndex: branchIndex !== -1 ? branchIndex : 0,
            map: false
        };
        this.openMap = this.openMap.bind(this);
        this.closeMap = this.closeMap.bind(this);
        this.prevBranch = this.prevBranch.bind(this);
        this.nextBranch = this.nextBranch.bind(this);
    }
    openMap() {
        this.setState({ map: true });
    }

    closeMap() {
        this.setState({ map: false });
    }
    prevBranch() {
        const { branches, branchIndex } = this.state;
        if (branchIndex === 0) {
            this.setState({ branchIndex: branches.length - 1 });
        } else {
            this.setState({ branchIndex: branchIndex - 1 });
        }
    }
    nextBranch() {
        const { branches, branchIndex } = this.state;
        if (branchIndex === branches.length - 1) {
            this.setState({ branchIndex: 0 });
        } else {
            this.setState({ branchIndex: branchIndex + 1 });
        }
    }
    styles = {
        horizontalVerticalCenter: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }
    };
    renderImages() {
        const { serviceTypeData } = this.props;
        const { branches, branchIndex } = this.state;
        const { imageKey } = serviceTypeData;
        const images = branches[branchIndex][imageKey];
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
                    <h1>
                        NO IMAGE FOR {branches[branchIndex].title.toUpperCase()}
                    </h1>
                </div>
            );
        }
    }
    render() {
        const { data, serviceTypeData } = this.props;
        const { branches, branchIndex } = this.state;
        const branch = branches[branchIndex];
        return (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    color: "white"
                }}
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
                        style={{
                            height: "14%",
                            textDecoration: "none"
                        }}
                        to={serviceNamespace}
                    >
                        <div
                            style={{
                                borderStyle: "none none solid none",
                                borderColor: LightOrange,
                                paddingBottom: "35px"
                            }}
                        >
                            <img
                                src={ServiceTypesIcon}
                                style={{ width: "33%", paddingTop: "23px" }}
                                alt="Service Types Icon"
                            />
                            <div
                                style={{
                                    color: "white",
                                    fontSize: "16px",
                                    paddingTop: "10px"
                                }}
                            >
                                SERVICE TYPES
                            </div>
                        </div>
                    </Link>
                    <Link
                        style={{
                            height: "14%",
                            textDecoration: "none"
                        }}
                        to={serviceTypeData.namespace}
                    >
                        <div
                            style={{
                                borderStyle: "none none solid none",
                                borderColor: LightOrange,
                                paddingBottom: "35px"
                            }}
                        >
                            <img
                                src={serviceTypeData.icon}
                                style={{ width: "33%", paddingTop: "23px" }}
                                alt="Service Type Icon"
                            />
                            <div
                                style={{
                                    color: "white",
                                    fontSize: "16px",
                                    paddingTop: "10px"
                                }}
                            >
                                {serviceTypeData.title}
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
                            SERVICES
                        </span>
                    </div>
                </div>
                <div style={{ width: "86%" }}>
                    {this.renderImages()}
                    <div style={{ height: "58%" }}>
                        <div style={{ height: "26%", display: "flex" }}>
                            <div
                                style={{
                                    flexBasis: "33%",
                                    backgroundImage: `url(${branch.logo})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    borderWidth: "1px",
                                    borderStyle: "solid solid solid none",
                                    borderColor: "rgb(8,152,163)"
                                }}
                            />
                            <div
                                style={{
                                    flex: 1,
                                    backgroundColor: LightBlueButtonBackground,
                                    ...this.styles.horizontalVerticalCenter,
                                    borderWidth: "1px",
                                    borderStyle: "solid none solid solid",
                                    borderColor: "rgb(183,223,228)",
                                    paddingLeft: "50px",
                                    paddingTop: "10px",
                                    fontSize: "28px",
                                    fontWeight: "500",
                                    letterSpacing: "3px"
                                }}
                            >
                                {data.title.toUpperCase()}
                            </div>
                        </div>
                        <div style={{ height: "74%", display: "flex" }}>
                            <div
                                style={{
                                    width: "50%",
                                    backgroundColor: ExtraHeavyBlueGreen,
                                    borderRight: "2px solid rgb(103,195,209)",
                                    textAlign: "left",
                                    paddingTop: "35px",
                                    paddingLeft: "50px",
                                    paddingRight: "50px",
                                    paddingBottom: "35px",
                                    fontSize: "20px",
                                    letterSpacing: "1px"
                                }}
                            >
                                <Markdown source={branch.description} />
                            </div>
                            <div style={{ width: "50%" }}>
                                <div style={{ height: "28%" }}>
                                    <div
                                        style={{
                                            height: "50%",
                                            display: "flex"
                                        }}
                                    >
                                        <div
                                            style={{
                                                flex: 1,
                                                ...this.styles
                                                    .horizontalVerticalCenter,
                                                backgroundColor: LightBlueButtonBackground,
                                                fontSize: "20px",
                                                letterSpacing: "2px",
                                                paddingTop: "10px"
                                            }}
                                            onClick={this.prevBranch}
                                        >
                                            PREVIOUS
                                        </div>
                                        <div
                                            style={{
                                                flex: 1,
                                                ...this.styles
                                                    .horizontalVerticalCenter,
                                                backgroundColor:
                                                    "rgb(75,175,188)",
                                                color: "rgb(0,109,121)",
                                                fontSize: "20px",
                                                letterSpacing: "2px",
                                                paddingTop: "10px"
                                            }}
                                        >
                                            LOCATION
                                        </div>
                                        <div
                                            style={{
                                                flex: 1,
                                                ...this.styles
                                                    .horizontalVerticalCenter,
                                                backgroundColor: LightBlueButtonBackground,
                                                fontSize: "20px",
                                                letterSpacing: "2px",
                                                paddingTop: "10px"
                                            }}
                                            onClick={this.nextBranch}
                                        >
                                            NEXT
                                        </div>
                                    </div>
                                    <div
                                        style={{
                                            height: "50%",
                                            backgroundColor: "rgb(183,223,228)",
                                            color: "rgb(0,109,121)",
                                            ...this.styles
                                                .horizontalVerticalCenter,
                                            paddingTop: "10px",
                                            fontWeight: "500",
                                            fontSize: "20px",
                                            letterSpacing: "1px"
                                        }}
                                    >
                                        {branch.title.toUpperCase()}
                                    </div>
                                </div>
                                <div
                                    style={{
                                        height: "72%",
                                        backgroundColor: ExtraHeavyBlueGreen
                                    }}
                                >
                                    <div
                                        style={{
                                            height: "69%",

                                            textAlign: "left",
                                            paddingTop: "35px",
                                            paddingLeft: "50px",
                                            paddingRight: "50px",
                                            paddingBottom: "35px",
                                            fontSize: "20px",
                                            letterSpacing: "1px",
                                            overflowWrap: "break-word",
                                            wordWrap: "break-word"
                                        }}
                                    >
                                        {branch.phone && (
                                            <div>
                                                CALL TODAY: {branch.phone}
                                            </div>
                                        )}
                                        {branch.website && (
                                            <div>
                                                WEB:{" "}
                                                {removeHttp(branch.website)}
                                            </div>
                                        )}
                                        {branch.email && (
                                            <div>EMAIL: {branch.email}</div>
                                        )}
                                        {branch.address && (
                                            <div>{branch.address}</div>
                                        )}
                                    </div>
                                    <div
                                        style={{
                                            height: "31%",
                                            ...this.styles
                                                .horizontalVerticalCenter
                                        }}
                                    >
                                        {branch[serviceTypeData.mapKey].length >
                                            0 && (
                                            <MapModal
                                                buttonStyle={{
                                                    paddingLeft: "30px",
                                                    paddingRight: "30px",
                                                    width: "100%"
                                                }}
                                                textStyle={{
                                                    height: "60px",
                                                    width: "100%",
                                                    borderRadius: "5px",
                                                    fontSize: "20px",
                                                    fontWeight: 500,
                                                    boxShadow:
                                                        "0px 0px 10px 1px rgba(0,0,0,0.5)",
                                                    backgroundColor: LightBlueButtonBackground,
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center"
                                                }}
                                                buttonTitle="SEE MAP"
                                                title={data.title}
                                                mapImage={
                                                    branch[
                                                        serviceTypeData.mapKey
                                                    ][0].mapImage
                                                }
                                            />
                                            // <div
                                            //     style={{
                                            //         paddingLeft: '30px',
                                            //         paddingRight: '30px',
                                            //         width: '100%'
                                            //     }}
                                            // >
                                            //     <div
                                            //         style={{
                                            //             height: '60px',
                                            //             width: '100%',
                                            //             borderRadius: '5px',
                                            //             fontSize: '20px',
                                            //             fontWeight: 500,
                                            //             boxShadow:
                                            //                 '0px 0px 10px 1px rgba(0,0,0,0.5)',
                                            //             backgroundColor: LightBlueButtonBackground,
                                            //             display: 'flex',
                                            //             alignItems: 'center',
                                            //             justifyContent: 'center'
                                            //         }}
                                            //     >
                                            //         SEE MAP
                                            //     </div>
                                            // </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ServiceBranch;
