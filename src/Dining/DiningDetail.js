import React from "react";
import * as actions from "../actions/dining";
import { connect } from "react-redux";
import {
    DECIMAL_RADIX,
    diningNamespace,
    imageGallery,
    HeavyOrange,
    LightBlueButtonBackground,
    ExtraHeavyBlueGreen,
    LightOrange
} from "../Constants";
import { Link } from "react-router-dom";
import RestaurantListIcon from "./icons/RestaurantListIcon.png";
import MapModal from "../Maps/MapModal";
import Markdown from "../Markdown";

class DiningDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            map: false
        };
        this.openMap = this.openMap.bind(this);
        this.closeMap = this.closeMap.bind(this);
    }

    openMap() {
        this.setState({ map: true });
    }

    closeMap() {
        this.setState({ map: false });
    }

    componentDidMount() {
        const { restaurants } = this.props;
        const id = parseInt(this.props.match.params.id, DECIMAL_RADIX);
        this.props.fetchDiningDetail(id, restaurants);
    }

    componentDidUpdate(prevProps) {
        const { restaurants } = this.props;
        if (prevProps.match.params.id !== this.props.match.params.id) {
            const id = parseInt(this.props.match.params.id, DECIMAL_RADIX);
            this.props.fetchDiningDetail(id, restaurants);
        }
    }

    renderImages() {
        const { imageRestaurant: images } = this.props.restaurant;
        if (images.length > 1) {
            return imageGallery(images, "100%", "27vh");
        } else if (images.length === 1) {
            return (
                <div
                    style={{
                        height: "50%",
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
                        height: "50%",
                        backgroundColor: HeavyOrange,
                        ...this.styles.horizontalVerticalCenter
                    }}
                >
                    <h1>NO IMAGE FOR THIS RESTAURANT</h1>
                </div>
            );
        }
    }
    styles = {
        horizontalVerticalCenter: {
            display: "flex",
            justifyContent: "center"
        },
        contactDetailText: {
            textAlign: "left",
            margin: 0,
            padding: 0,
            lineHeight: "130%",
            letterSpacing: "2px",
            fontSize: "20px"
        }
    };
    render() {
        const { restaurant, status } = this.props;
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
                        style={{
                            height: "14%",
                            textDecoration: "none"
                        }}
                        to={diningNamespace}
                    >
                        <div
                            style={{
                                borderStyle: "none none solid none",
                                borderColor: LightOrange,
                                paddingBottom: "20px"
                            }}
                        >
                            <img
                                src={RestaurantListIcon}
                                style={{ width: "33%", paddingTop: "30px" }}
                                alt="Restaurant List Icon"
                            />
                            <div
                                style={{
                                    color: "white",
                                    letterSpacing: "2px",
                                    fontSize: "18px",
                                    paddingTop: "10px"
                                }}
                            >
                                RESTAURANT LIST
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
                            DINING
                        </span>
                    </div>
                </div>
                {status === 200 && (
                    <div style={{ flex: 1 }}>
                        {this.renderImages()}
                        <div style={{ height: "25%", display: "flex" }}>
                            <div
                                style={{
                                    flexBasis: "50%",
                                    backgroundImage: `url(${restaurant.logo})`,
                                    backgroundRepeat: "no-repeat",
                                    backgroundSize: "cover",
                                    backgroundPosition: "center"
                                }}
                            />
                            <div
                                style={{
                                    flexBasis: "50%",
                                    backgroundColor: LightBlueButtonBackground
                                }}
                            >
                                <div
                                    style={{
                                        height: "50%",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "flex-end",
                                        paddingBottom: 20,
                                        paddingTop: "10px",
                                        paddingLeft: "20px",
                                        paddingRight: "20px",
                                        overflowWrap: "break-word",
                                        wordWrap: "break-word",
                                        ...this.styles.horizontalVerticalCenter
                                    }}
                                >
                                    {restaurant.phone && (
                                        <p
                                            style={
                                                this.styles.contactDetailText
                                            }
                                        >
                                            CALL TODAY: {restaurant.phone}
                                        </p>
                                    )}
                                    {restaurant.website && (
                                        <p
                                            style={
                                                this.styles.contactDetailText
                                            }
                                        >
                                            {restaurant.website}
                                        </p>
                                    )}
                                    {restaurant.address && (
                                        <p
                                            style={
                                                this.styles.contactDetailText
                                            }
                                        >
                                            {restaurant.address}
                                        </p>
                                    )}
                                </div>
                                {restaurant.mapRestaurant.length > 0 && (
                                    <div
                                        style={{
                                            height: "50%",
                                            paddingLeft: 20,
                                            paddingRight: 20
                                        }}
                                    >
                                        <MapModal
                                            buttonTitle={`${
                                                restaurant.title
                                            } MAP`}
                                            title={restaurant.title}
                                            buttonStyle={{
                                                backgroundColor: HeavyOrange,
                                                width: "100%",
                                                height: "50%",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                boxShadow:
                                                    "0px 0px 10px 1px rgba(0,0,0,0.5)",
                                                borderRadius: "5px",
                                                fontSize: "20px",
                                                fontWeight: 500,
                                                paddingTop: "5px"
                                            }}
                                            textStyle={{}}
                                            mapImage={
                                                restaurant.mapRestaurant[0]
                                                    .mapImage
                                            }
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div
                            style={{
                                height: "25%",
                                display: "flex",
                                backgroundColor: ExtraHeavyBlueGreen
                            }}
                        >
                            <div
                                style={{
                                    flexBasis: "50%",
                                    paddingTop: 20,
                                    paddingLeft: 35,
                                    paddingRight: 20,
                                    fontSize: "19px",
                                    lineHeight: "115%",
                                    letterSpacing: "1px",
                                    textAlign: "left"
                                }}
                            >
                                <Markdown source={restaurant.description} />
                            </div>
                            <div
                                style={{
                                    flexBasis: "50%",
                                    paddingTop: 20,
                                    paddingLeft: 35,
                                    paddingRight: 20,
                                    fontSize: "19px",
                                    lineHeight: "115%",
                                    letterSpacing: "1px",
                                    textAlign: "left"
                                }}
                            >
                                <div>CUISINE: {restaurant.guide.cuisine}</div>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between"
                                    }}
                                >
                                    <span>
                                        TAKEAWAY: {restaurant.guide.takeaway}
                                    </span>
                                    <span>WIFI: {restaurant.guide.wifi}</span>
                                    <span>
                                        PARKING: {restaurant.guide.parking}
                                    </span>
                                </div>
                                <div>
                                    COURTESY TRANSPORT:{" "}
                                    {restaurant.guide.courtesy}
                                </div>
                                <div>
                                    CARDS ACCEPTED: {restaurant.guide.cards}
                                </div>
                                <div>
                                    PRICE GUIDE:
                                    <br />
                                    {restaurant.guide.price}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

const mapStateToProps = ({ restaurantDetail, restaurantList }) => {
    const { restaurant, status } = restaurantDetail;
    const { restaurants } = restaurantList;
    return {
        restaurants,
        restaurant,
        status
    };
};
export default connect(
    mapStateToProps,
    actions
)(DiningDetail);
