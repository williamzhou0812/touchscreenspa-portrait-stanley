import React from 'react';
import AdOrRestVideo from './AdOrRestVideo';
import ImageGallery from 'react-image-gallery';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PlayIcon from 'material-ui/svg-icons/av/play-arrow';
import PauseIcon from 'material-ui/svg-icons/av/pause';
import { Link } from 'react-router-dom';
import {
    accomodationNamespace,
    eventNamespace,
    diningNamespace,
    destinationNamespace,
    activityNamespace,
    serviceNamespace,
    essentialNamespace,
    transportNamespace,
    miningNamespace,
    retailNamespace,
    airportMapNamespace,
    airportInfoNamespace,
    searchResultNamespace,
    mapListNamespace,
    AD_SLIDE_INTERVAL,
    randomiseButKeepOrder,
    DECIMAL_RADIX
} from '../Constants';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Advertisement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ads: [],
            status: null,
            showAds: true
        };
    }
    componentDidMount() {
        this.getAdvertisementsBasedOnLocation();
    }
    componentDidUpdate(prevProps) {
        const { location } = this.props;
        if (prevProps.location.pathname !== location.pathname) {
            this.getAdvertisementsBasedOnLocation();
        }
    }
    setAdsStatus(ads) {
        this.setState({ status: null }, _ => {
            this.setState({
                ads: ads,
                status: 200,
                showAds: true
            });
        });
    }
    getAdvertisementsBasedOnLocation() {
        const { location } = this.props;
        const pathnameArray = location.pathname.split('/');
        const currentNamespace = pathnameArray[1];
        const serviceDifferentiatorNamespace =
            pathnameArray.length > 2 && pathnameArray[2];
        const {
            adsDestination,
            adsRestaurant,
            adsEvent,
            adsAccommodation,
            adsActivityDestination,
            adsEssential,
            adsMining,
            adsRetail,
            adsTransport,
            adsServices
        } = this.props.advertisementList;
        if (destinationNamespace.includes(currentNamespace)) {
            //Get ads from destinations
            return this.setAdsStatus(adsDestination);
        } else if (diningNamespace.includes(currentNamespace)) {
            //Get ads from dining
            if (pathnameArray.length === 2) {
                //All general ads
                return this.setAdsStatus(adsRestaurant);
            } else {
                //Check if we only need to display specific ads only
                const { restaurants } = this.props.specificAdsRestaurantList;
                const restaurantID = parseInt(pathnameArray[2], DECIMAL_RADIX);
                if (restaurantID) {
                    const restaurant = restaurants.find(rest => {
                        return rest.id === restaurantID;
                    });
                    if (restaurant && restaurant.onlyShowSpecificAds) {
                        //Show only specific restaurant ads
                        const ads = adsRestaurant.filter(ad => {
                            return ad.restaurant === restaurantID;
                        });
                        if (ads.length > 0) {
                            //Show only specific restaurant ads and there is ads linked to this restaurant
                            return this.setAdsStatus(ads);
                        } else {
                            //No ads linked to this restaurant, show all dining ads
                            return this.setAdsStatus(adsRestaurant);
                        }
                    } else {
                        //Show all dining ads
                        return this.setAdsStatus(adsRestaurant);
                    }
                } else {
                    //Show all dining ads
                    return this.setAdsStatus(adsRestaurant);
                }
            }
        } else if (eventNamespace.includes(currentNamespace)) {
            //Get ads from events
            if (pathnameArray.length === 2) {
                //Combined ads
                return this.setAdsStatus(adsEvent);
            } else {
                /* OLD CODE
                //Don't show ads
                this.setState({ showAds: false }); */
                //Check if we only need to display specific ads only
                const { events } = this.props.specificAdsEventList;
                const eventID = parseInt(pathnameArray[2], DECIMAL_RADIX);
                if (eventID) {
                    const event = events.find(e => {
                        return e.id === eventID;
                    });
                    if (event && event.onlyShowSpecificAds) {
                        //Show only specific event service ads
                        const ads = adsEvent.filter(ad => {
                            return ad.event === eventID;
                        });
                        if (ads.length > 0) {
                            //Show only specific event ads and there are ads linked to this event
                            return this.setAdsStatus(ads);
                        } else {
                            //No ads linked to this event, show all event ads
                            return this.setAdsStatus(adsEvent);
                        }
                    } else {
                        //Show all event ads
                        return this.setAdsStatus(adsEvent);
                    }
                } else {
                    //Show all event ads
                    return this.setAdsStatus(adsEvent);
                }
            }
        } else if (accomodationNamespace.includes(currentNamespace)) {
            //Get ads from accommodations
            if (pathnameArray.length === 2 || pathnameArray.length === 3) {
                //Combined ads
                return this.setAdsStatus(adsAccommodation);
            } else {
                /* OLD CODE
                //Don't show ads
                this.setState({ showAds: false }); */
                //Check if we only need to display specific ads only
                const {
                    accommodations
                } = this.props.specificAdsAccommodationList;
                const accoID = parseInt(pathnameArray[3], DECIMAL_RADIX);
                if (accoID) {
                    const accomodation = accommodations.find(a => {
                        return a.id === accoID;
                    });
                    if (accomodation && accomodation.onlyShowSpecificAds) {
                        //Show only specific accommodation service ads
                        const ads = adsAccommodation.filter(ad => {
                            return ad.accomodation === accoID;
                        });
                        if (ads.length > 0) {
                            //Show only specific accommodation ads and there are ads linked to this accommodation
                            return this.setAdsStatus(ads);
                        } else {
                            //No ads linked to this accommodation, show all accommodation service ads
                            return this.setAdsStatus(adsAccommodation);
                        }
                    } else {
                        //Show all accommodation ads
                        return this.setAdsStatus(adsAccommodation);
                    }
                } else {
                    //Show all accommodation ads
                    return this.setAdsStatus(adsAccommodation);
                }
            }
        } else if (activityNamespace.includes(currentNamespace)) {
            //Get ads from destinations for activity
            if (pathnameArray.length === 2 || pathnameArray.length === 3) {
                //Combined ads
                return this.setAdsStatus(adsActivityDestination);
            } else {
                //Check if we only need to display specific ads only
                const {
                    activityDestinations
                } = this.props.specificAdsActivityDestinationList;
                const destID = parseInt(pathnameArray[3], DECIMAL_RADIX);
                if (destID) {
                    const activityDestination = activityDestinations.find(
                        dest => {
                            return dest.id === destID;
                        }
                    );
                    if (
                        activityDestination &&
                        activityDestination.onlyShowSpecificAds
                    ) {
                        //Show only specific destination for activity ads
                        const ads = adsActivityDestination.filter(ad => {
                            return ad.activityDestination === destID;
                        });
                        if (ads.length > 0) {
                            //Show only specific destination for activity ads and there are ads linked to this destination for activity
                            return this.setAdsStatus(ads);
                        } else {
                            //No ads linked to this destination for activity, show all destination for activity ads
                            return this.setAdsStatus(adsActivityDestination);
                        }
                    } else {
                        //Show all destination for activity ads
                        return this.setAdsStatus(adsActivityDestination);
                    }
                } else {
                    //Show all destination for activity ads
                    return this.setAdsStatus(adsActivityDestination);
                }
            }
        } else if (
            essentialNamespace.includes(serviceDifferentiatorNamespace)
        ) {
            //Get ads from essential services
            if (pathnameArray.length === 3 || pathnameArray.length === 4) {
                //Combined ads
                return this.setAdsStatus(adsEssential);
            } else {
                //Check if we only need to display specific ads only
                const { essentials } = this.props.specificAdsEssentialList;
                const serviceID = parseInt(pathnameArray[4], DECIMAL_RADIX);
                if (serviceID) {
                    const essential = essentials.find(ess => {
                        return ess.id === serviceID;
                    });
                    if (essential && essential.onlyShowSpecificAds) {
                        //Show only specific essential service ads
                        const ads = adsEssential.filter(ad => {
                            return ads.essentialservice === serviceID;
                        });
                        if (ads.length > 0) {
                            //Show only specific essential ads and there are ads linked to this essential service
                            return this.setAdsStatus(ads);
                        } else {
                            //No ads linked to this essential service, show all essential service ads
                            return this.setAdsStatus(adsEssential);
                        }
                    } else {
                        //Show all essential service ads
                        return this.setAdsStatus(adsEssential);
                    }
                } else {
                    //Show all essential service ads
                    return this.setAdsStatus(adsEssential);
                }
            }
        } else if (
            transportNamespace.includes(serviceDifferentiatorNamespace)
        ) {
            //Get ads from car hire & transport services
            if (pathnameArray.length === 3 || pathnameArray.length === 4) {
                //First level ads only
                return this.setAdsStatus(adsTransport);
            } else {
                //Check if we only need to display specific ads only
                const { transports } = this.props.specificAdsTransportList;
                const serviceID = parseInt(pathnameArray[4], DECIMAL_RADIX);
                if (serviceID) {
                    const transport = transports.find(tra => {
                        return tra.id === serviceID;
                    });
                    if (transport && transport.onlyShowSpecificAds) {
                        //Show only specific transport service ads
                        const ads = adsTransport.filter(ad => {
                            return ad.transportation === serviceID;
                        });
                        if (ads.length > 0) {
                            //Show only specific transportation ads and there are ads linked to this transportation service
                            return this.setAdsStatus(ads);
                        } else {
                            //No ads linked to this transportation, show all transportation service ads
                            return this.setAdsStatus(adsTransport);
                        }
                    } else {
                        //Show all transport service ads
                        return this.setAdsStatus(adsTransport);
                    }
                } else {
                    //Show all transport service ads
                    return this.setAdsStatus(adsTransport);
                }
            }
        } else if (miningNamespace.includes(serviceDifferentiatorNamespace)) {
            //Get ads from mining & resources services
            if (pathnameArray.length === 3 || pathnameArray.length === 4) {
                //Combined ads
                return this.setAdsStatus(adsMining);
            } else {
                //Check if we only need to display specific ads only
                const { minings } = this.props.specificAdsMiningList;
                const serviceID = parseInt(pathnameArray[4], DECIMAL_RADIX);
                if (serviceID) {
                    const mine = minings.find(min => {
                        return min.id === serviceID;
                    });
                    if (mine && mine.onlyShowSpecificAds) {
                        //Show only specific mining service ads
                        const ads = adsMining.filter(ad => {
                            return ad.mining === serviceID;
                        });
                        if (ads.length > 0) {
                            //Show only specific mining ads and there are ads linked to this mining service
                            return this.setAdsStatus(ads);
                        } else {
                            //No ads linked to this mining service, show all mining service ads
                            return this.setAdsStatus(adsMining);
                        }
                    } else {
                        //Show all mining service ads
                        return this.setAdsStatus(adsMining);
                    }
                } else {
                    //Show all mining service ads
                    return this.setAdsStatus(adsMining);
                }
            }
        } else if (retailNamespace.includes(serviceDifferentiatorNamespace)) {
            //Get ads from retail & services
            if (pathnameArray.length === 3 || pathnameArray.length === 4) {
                //Combined ads
                return this.setAdsStatus(adsRetail);
            } else {
                //Check if we only need to display specific ads only
                const { retails } = this.props.specificAdsRetailList;
                const serviceID = parseInt(pathnameArray[4], DECIMAL_RADIX);
                if (serviceID) {
                    const retail = retails.find(ret => {
                        return ret.id === serviceID;
                    });
                    if (retail && retail.onlyShowSpecificAds) {
                        //Show only specific retail service ads
                        const ads = adsRetail.filter(ad => {
                            return ad.retail === serviceID;
                        });
                        if (ads.length > 0) {
                            //Show only specific retail ads and there are ads linked to this retail service
                            return this.setAdsStatus(ads);
                        } else {
                            //No ads linked to this retail service, show all retail ads
                            return this.setAdsStatus(adsRetail);
                        }
                    } else {
                        //Show all retail service ads
                        return this.setAdsStatus(adsRetail);
                    }
                } else {
                    //Show all retail service ads
                    return this.setAdsStatus(adsRetail);
                }
            }
        } else if (serviceNamespace.includes(currentNamespace)) {
            //Get ads from services
            return this.setAdsStatus(adsServices);
        } else if (
            airportMapNamespace.includes(currentNamespace) ||
            airportInfoNamespace.includes(currentNamespace)
        ) {
            //Show random ads in Airport page
            const allAds = [
                adsDestination,
                adsRestaurant,
                adsEvent,
                adsAccommodation,
                adsActivityDestination,
                adsEssential,
                adsMining,
                adsRetail,
                adsTransport,
                adsServices
            ];
            const randomAds = allAds[Math.floor(Math.random() * allAds.length)];
            return this.setAdsStatus(randomAds);
        } else if (mapListNamespace.includes(currentNamespace)) {
            const allAds = [
                adsDestination,
                adsRestaurant,
                adsEvent,
                adsAccommodation,
                adsActivityDestination,
                adsEssential,
                adsMining,
                adsRetail,
                adsTransport,
                adsServices
            ];
            const randomAds = allAds[Math.floor(Math.random() * allAds.length)];
            return this.setAdsStatus(randomAds);
        } else if (searchResultNamespace.includes(currentNamespace)) {
            this.setState({
                ads: [],
                showAds: false,
                status: null
            });
        }
    }
    formatAdRedirectTo(redirectTo) {
        if (!redirectTo) {
            return null;
        } else {
            if (redirectTo[0] === '/' || redirectTo[0] === '/') {
                return redirectTo;
            } else {
                return `/${redirectTo}`;
            }
        }
    }
    getAdvertisementImages() {
        const { ads } = this.state;
        let images = [];
        if (ads.length === 1) {
            //If there is only a single ad
            ads[0].imageAdvertisement.forEach(img => {
                images.push({
                    ...img,
                    redirectTo: this.formatAdRedirectTo(ads[0].redirectTo),
                    advID: ads[0].id
                });
            });
        } else {
            //Randomise ads and keep order (if there is any order whatsoever)
            const randomisedAds = randomiseButKeepOrder(ads);
            randomisedAds.forEach(ad => {
                if (ad.imageAdvertisement && ad.imageAdvertisement.length > 0) {
                    ad.imageAdvertisement.forEach(img => {
                        images.push({
                            ...img,
                            redirectTo: this.formatAdRedirectTo(ad.redirectTo),
                            advID: ad.id
                        });
                    });
                }
            });
        }
        return images;
    }
    renderAdvertisementImages() {
        const images = this.getAdvertisementImages();
        if (images.length === 1) {
            const image = images[0];
            // axios.post(createURL(`advertisementpostshow/${image.advID}/`)); //Log image being shown in the SPA
            if (image.redirectTo) {
                return (
                    <Link
                        style={{
                            width: '50%',
                            height: '100%',
                            backgroundImage: `url(${image.imageFile})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                        to={image.redirectTo}
                    />
                );
            } else {
                return (
                    <div
                        style={{
                            width: '50%',
                            height: '100%',
                            backgroundImage: `url(${image.imageFile})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                    />
                );
            }
        } else if (images.length > 1) {
            //Preparing images
            const modifiedImages = images.map(image => {
                return {
                    original: image.imageFile,
                    redirectTo: image.redirectTo,
                    advID: image.advID
                };
            });
            return (
                <MuiThemeProvider>
                    <ImageGallery
                        items={modifiedImages}
                        slideInterval={AD_SLIDE_INTERVAL}
                        showThumbnails={false}
                        showPlayButton={true}
                        showFullscreenButton={false}
                        autoPlay={true}
                        showNav={true}
                        renderItem={item => {
                            //Record Advertisement being shown in the SPA
                            // axios.post(createURL(`advertisementpostshow/${item.advID}/`));
                            if (item.redirectTo) {
                                return (
                                    <Link
                                        to={item.redirectTo}
                                        onClick={() => {
                                            //Record Advertisement being clicked in the SPA
                                            // axios.post(createURL(`advertisementpostclick/${item.advID}/`));
                                        }}
                                        className="image-gallery-image"
                                    >
                                        <img
                                            src={item.original}
                                            alt={item.originalAlt}
                                            srcSet={item.srcSet}
                                            sizes={item.sizes}
                                            title={item.originalTitle}
                                            style={{
                                                width: '50vw',
                                                height: '16vh'
                                            }}
                                        />
                                    </Link>
                                );
                            } else {
                                return (
                                    <div
                                        className="image-gallery-image"
                                        onClick={() => {
                                            //Record Advertisement being clicked in the SPA
                                            // axios.post(createURL(`advertisementpostclick/${item.advID}/`));
                                        }}
                                    >
                                        <img
                                            src={item.original}
                                            alt={item.originalAlt}
                                            srcSet={item.srcSet}
                                            sizes={item.sizes}
                                            title={item.originalTitle}
                                            style={{
                                                width: '50vw',
                                                height: '16vh'
                                            }}
                                        />
                                    </div>
                                );
                            }
                        }}
                        renderPlayPauseButton={(onClick, isPlaying) => {
                            if (isPlaying) {
                                return (
                                    <PauseIcon
                                        className="image-gallery-play-button active"
                                        onClick={onClick}
                                        color="rgba(0,0,0,0.3)"
                                        style={{
                                            padding: 0,
                                            height: 32,
                                            width: 32
                                        }}
                                    />
                                );
                            } else {
                                return (
                                    <PlayIcon
                                        className="image-gallery-play-button"
                                        onClick={onClick}
                                        color="rgba(0,0,0,0.3)"
                                        style={{
                                            padding: 0,
                                            height: 32,
                                            width: 32
                                        }}
                                    />
                                );
                            }
                        }}
                    />
                </MuiThemeProvider>
            );
        }
    }
    renderAds() {
        const { continuePlaying } = this.props;
        const { showAds, status } = this.state;
        if (showAds) {
            return (
                <div style={{ width: '100%', height: '100%', display: 'flex' }}>
                    {status === 200 && this.renderAdvertisementImages()}
                    <div style={{ width: '50%', backgroundColor: 'black' }}>
                        {continuePlaying && <AdOrRestVideo />}
                    </div>
                </div>
            );
        }
    }
    render() {
        return (
            <div style={{ width: '100%', height: '100%' }}>
                {this.renderAds()}
            </div>
        );
    }
}
function mapStateToProps({
    advertisementList,
    specificAdsActivityDestinationList,
    specificAdsEssentialList,
    specificAdsMiningList,
    specificAdsRestaurantList,
    specificAdsRetailList,
    specificAdsTransportList,
    specificAdsAccommodationList,
    specificAdsEventList
}) {
    return {
        advertisementList,
        specificAdsActivityDestinationList,
        specificAdsEssentialList,
        specificAdsMiningList,
        specificAdsRestaurantList,
        specificAdsRetailList,
        specificAdsTransportList,
        specificAdsAccommodationList,
        specificAdsEventList
    };
}

export default connect(mapStateToProps, actions)(Advertisement);
