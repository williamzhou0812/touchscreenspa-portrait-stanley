import React from 'react';
import { connect } from 'react-redux';
import {
    DECIMAL_RADIX,
    accomodationNamespace,
    HeavyOrange,
    LightBlueButtonBackground,
    imageGallery,
    renderRating,
    ExtraHeavyBlueGreen
} from '../Constants';
import { Link } from 'react-router-dom';
import AllAreasIcon from '../Destination/icons/AllAreas.png';
import HotelListIcon from './icons/HotelListIcon.png';

class HotelDetail extends React.Component {
    destIndex = -1;
    constructor(props) {
        super(props);
        const accommodation = { ...this.getHotelDetail() };
        this.state = {
            accommodation,
            map1: false,
            map2: false
        };

        //Binding methods
        this.openMap1 = this.openMap1.bind(this);
        this.closeMap1 = this.closeMap1.bind(this);
        this.openMap2 = this.openMap2.bind(this);
        this.closeMap2 = this.closeMap2.bind(this);
    }

    openMap1() {
        this.setState({ map1: true });
    }
    closeMap1() {
        this.setState({ map1: false });
    }

    openMap2() {
        this.setState({ map2: true });
    }
    closeMap2() {
        this.setState({ map2: false });
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
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }
    };

    renderImages() {
        const { imageAccomodation: images } = this.state.accommodation;
        if (images.length > 1) {
            return imageGallery(images, '100%', '22.68vh');
        } else if (images.length === 1) {
            return (
                <div
                    style={{
                        height: '42%',
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
                        height: '42%',
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
                    <div>{map1.title.toUpperCase()}</div>
                    <div>{map2.title.toUpperCase()}</div>
                </div>
            );
        } else if (maps.length === 1) {
            const map1 = maps[0];
            return (
                <div>
                    <div>{map1.title.toUpperCase()}</div>
                </div>
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
                        height: '100%',
                        boxShadow: '9.899px 0px 7px 0px rgba(0,0,0,0.6)',
                        zIndex: 1
                    }}
                >
                    <Link style={{ height: '14%' }} to={accomodationNamespace}>
                        <img src={AllAreasIcon} style={{ width: '33%' }} />
                        <div style={{ color: 'white' }}>ALL AREAS</div>
                    </Link>
                    <Link
                        style={{ height: '14%' }}
                        to={`${accomodationNamespace}/${destID}`}
                    >
                        <img src={HotelListIcon} style={{ width: '33%' }} />
                        <div style={{ color: 'white' }}>{destName} HOTELS}</div>
                    </Link>
                    <div
                        style={{
                            transform: 'rotate(-90deg)',
                            color: 'white',
                            fontSize: '40pt',
                            fontWeight: 500,
                            letterSpacing: '10px',
                            height: '72%',
                            ...this.styles.horizontalVerticalCenter
                        }}
                    >
                        HOTELS
                    </div>
                </div>
                {!!accommodation && (
                    <div style={{ width: '86%', height: '100%' }}>
                        {this.renderImages()}
                        <div style={{ height: '58%' }}>
                            <div style={{ height: '26%', display: 'flex' }}>
                                <div
                                    style={{
                                        flexBasis: '33%',
                                        backgroundImage: `url(${
                                            accommodation.logo
                                        })`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center'
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
                                            height: '50%',
                                            ...this.styles
                                                .horizontalVerticalCenter
                                        }}
                                    >
                                        {accommodation.title.toUpperCase()}
                                    </div>
                                    <div style={{ height: '50%' }}>
                                        {renderRating(accommodation.rating, 38)}
                                    </div>
                                </div>
                            </div>
                            <div
                                style={{
                                    height: '74%',
                                    display: 'flex',
                                    backgroundColor: ExtraHeavyBlueGreen
                                }}
                            >
                                <div style={{ width: '50%' }}>
                                    {accommodation.description}
                                </div>
                                <div style={{ width: '50%' }}>
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

export default connect(mapStateToProps, null)(HotelDetail);
