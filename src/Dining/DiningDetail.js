import React from 'react';
import * as actions from '../actions/dining';
import { connect } from 'react-redux';
import {
    DECIMAL_RADIX,
    diningNamespace,
    imageGallery,
    HeavyOrange,
    LightBlueButtonBackground,
    ExtraHeavyBlueGreen
} from '../Constants';
import { Link } from 'react-router-dom';
import RestaurantListIcon from './icons/RestaurantListIcon.png';

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
            return imageGallery(images, '100%', '27vh');
        } else if (images.length === 1) {
            return (
                <div
                    style={{
                        height: '50%',
                        backgroundImage: `url(${images[0].imageFile})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                />
            );
        } else {
            return (
                <div
                    style={{
                        height: '50%',
                        backgroundColor: HeavyOrange,
                        ...this.styles.horizontalVerticalCenter
                    }}
                >
                    <h1>NO IMAGE FOR THIS RESTAURANT</h1>
                </div>
            );
        }
    }

    render() {
        const { restaurant, status } = this.props;
        return (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    color: 'white'
                }}
                className="section--bottom--animation"
            >
                <div
                    style={{
                        backgroundColor: HeavyOrange,
                        width: '14%',
                        boxShadow: '9.899px 0px 7px 0px rgba(0,0,0,0.6)',
                        zIndex: 1
                    }}
                >
                    <Link style={{ height: '14%' }} to={diningNamespace}>
                        <img
                            src={RestaurantListIcon}
                            style={{ width: '33%' }}
                        />
                        <div style={{ color: 'white' }}>RESTAURANT LIST</div>
                    </Link>
                    <div
                        style={{
                            fontSize: '28pt',
                            transform: 'rotate(-90deg)',
                            color: 'white',
                            height: '86%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        DINING
                    </div>
                </div>
                {status === 200 && (
                    <div style={{ flex: 1 }}>
                        {this.renderImages()}
                        <div style={{ height: '25%', display: 'flex' }}>
                            <div
                                style={{
                                    flexBasis: '50%',
                                    backgroundImage: `url(${restaurant.logo})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                }}
                            />
                            <div
                                style={{
                                    flexBasis: '50%',
                                    backgroundColor: LightBlueButtonBackground
                                }}
                            >
                                <div
                                    style={{
                                        height: '50%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'flex-end',
                                        alignItems: 'center',
                                        paddingBottom: 20
                                    }}
                                >
                                    {restaurant.phone && (
                                        <div>
                                            CALL TODAY: {restaurant.phone}
                                        </div>
                                    )}
                                    {restaurant.website && (
                                        <div>{restaurant.website}</div>
                                    )}
                                    {restaurant.address && (
                                        <div>{restaurant.address}</div>
                                    )}
                                </div>
                                {restaurant.mapRestaurant.length > 0 && (
                                    <div
                                        style={{
                                            height: '50%',
                                            paddingLeft: 20,
                                            paddingRight: 20
                                        }}
                                    >
                                        <div
                                            style={{
                                                backgroundColor: HeavyOrange,
                                                width: '100%',
                                                height: '50%',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}
                                        >
                                            {restaurant.mapRestaurant[0].title.toUpperCase()}{' '}
                                            MAP
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div
                            style={{
                                height: '25%',
                                display: 'flex',
                                backgroundColor: ExtraHeavyBlueGreen
                            }}
                        >
                            <div
                                style={{
                                    flexBasis: '50%',
                                    paddingTop: 20,
                                    paddingLeft: 20,
                                    paddingRight: 20
                                }}
                            >
                                {restaurant.description}
                            </div>
                            <div
                                style={{
                                    flexBasis: '50%',
                                    paddingTop: 20,
                                    paddingLeft: 20,
                                    paddingRight: 20
                                }}
                            >
                                <div>CUISINE: {restaurant.guide.cuisine}</div>
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between'
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
                                    COURTESY TRANSPORT:{' '}
                                    {restaurant.guide.courtesy}
                                </div>
                                <div>
                                    CARDS ACCEPTED: {restaurant.guide.cards}
                                </div>
                                <div>
                                    PRICE GUIDE:<br />
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
export default connect(mapStateToProps, actions)(DiningDetail);
