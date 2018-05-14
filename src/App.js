import React, { Component } from 'react';
import './App.css';
import Clock from './Clock';
import MainLogo from './interface/main_logo.png';
import MainTabList from './MainTab/MainTabList';
import { Redirect, Route, NavLink } from 'react-router-dom';
import { ConnectedRouter as Router } from 'react-router-redux';
import { connect } from 'react-redux';
import * as actions from './actions';
import ReactLoading from 'react-loading';
import {
    accomodationNamespace,
    eventNamespace,
    diningNamespace,
    destinationNamespace,
    serviceNamespace,
    mapListNamespace,
    essentialNamespace,
    transportNamespace,
    retailNamespace,
    miningNamespace,
    airportInfoNamespace,
    IDLE_TIME,
    activityNamespace
} from './Constants';
import DestinationList from './Destination/DestinationList';
import DestinationDetail from './Destination/DestinationDetail';
import EventList from './Event/EventList';
import EventDetail from './Event/EventDetail';
import DiningList from './Dining/DiningList';
import DiningDetail from './Dining/DiningDetail';
import HotelList from './Hotel/HotelList';
import HotelDetail from './Hotel/HotelDetail';
import ServiceInitialList from './Service/ServiceInitialList';
import ServiceTypeList from './Service/ServiceTypeList';
import ServiceList from './Service/ServiceList';
import ServiceDetail from './Service/ServiceDetail';
import ActivityList from './Activity/ActivityList';
import ActivityDestinationList from './Activity/ActivityDestinationList';
import ActivityDestinationDetail from './Activity/ActivityDestinationDetail';
import MapList from './Maps/MapList';
import Advertisement from './Advertisement/Advertisement';
import idleJS from 'idle-js';
import RestComponent from './RestMode/RestComponent';
import AirportInfo from './Airport/AirportInfo';
import AirportMapModal from './Airport/AirportMapModal';

class App extends Component {
    idleRef = null;
    constructor(props) {
        super(props);
        this.state = {
            isIdle: false
        };
        this.setSPAIdle = this.setSPAIdle.bind(this);
        this.setSPAActive = this.setSPAActive.bind(this);
    }
    setSPAIdle() {
        this.setState({ isIdle: true });
    }
    setSPAActive() {
        this.setState({ isIdle: false });
    }

    componentDidMount() {
        this.props.fetchDestinationList();
        this.props.fetchEventList();
        this.props.fetchAccommodationList();
        this.props.fetchDiningList();
        this.props.fetchActivityList();
        this.props.fetchEssentialTypeList();
        this.props.fetchMiningTypeList();
        this.props.fetchRetailTypeList();
        this.props.fetchTransportTypeList();
        this.props.fetchMapList();
        this.props.fetchAdVideoList();
        this.props.fetchAdvertisementList();
        this.props.fetchSpecificAdsRestaurantList();
        this.props.fetchSpecificAdsActivityDestinationList();
        this.props.fetchSpecificAdsEssentialList();
        this.props.fetchSpecificAdsMiningList();
        this.props.fetchSpecificAdsRetailList();
        this.props.fetchSpecificAdsTransportList();
        this.props.fetchSpecificAccommodationList();
        this.props.fetchSpecificAdsEventList();
        this.props.fetchFeaturedAdvertisementList();
        this.props.fetchAirportDetail();

        //Set idle timer
        this.idleRef = new idleJS({
            idle: IDLE_TIME,
            onIdle: this.setSPAIdle,
            onActive: this.setSPAActive
        }).start();
    }
    render() {
        const { isIdle } = this.state;
        if (
            this.props.destinationList.status !== 200 ||
            this.props.accommodationList.status !== 200 ||
            this.props.eventList.status !== 200 ||
            this.props.restaurantList.status !== 200 ||
            this.props.activityList.status !== 200 ||
            this.props.essentialServiceTypeList.status !== 200 ||
            this.props.miningServiceTypeList.status !== 200 ||
            this.props.retailServiceTypeList.status !== 200 ||
            this.props.transportServiceTypeList.status !== 200 ||
            this.props.map.status !== 200 ||
            this.props.airport.status !== 200 ||
            this.props.adVideoList.status !== 200 ||
            this.props.advertisementList.status !== 200 ||
            this.props.specificAdsRestaurantList.status !== 200 ||
            this.props.specificAdsActivityDestinationList.status !== 200 ||
            this.props.specificAdsEssentialList.status !== 200 ||
            this.props.specificAdsMiningList.status !== 200 ||
            this.props.specificAdsRetailList.status !== 200 ||
            this.props.specificAdsTransportList.status !== 200 ||
            this.props.specificAdsAccommodationList.status !== 200 ||
            this.props.specificAdsEventList.status !== 200 ||
            this.props.featuredAdvertisementList.status !== 200
        ) {
            return (
                <div className="loadingContainer">
                    <div className="loading ">
                        <p className="loading--title">Initialising</p>

                        <ReactLoading
                            className="loadingAnimation"
                            type={'bubbles'}
                            color={'#b9dfe3'}
                            height="900"
                            width="393"
                            delay={0}
                        />
                    </div>
                </div>
            );
        } else {
            return (
                <Router history={this.props.history}>
                    <div className="App section--rotate--animation">
                        <div
                            style={{
                                width: '100vw',
                                height: '15vh',
                                backgroundImage: `url(${MainLogo})`,
                                backgroundPosition: 'center',
                                backgroundSize: 'cover'
                            }}
                        />
                        <div
                            style={{
                                width: '100vw',
                                height: '3vh',
                                display: 'grid',
                                gridTemplateColumns: '28.6% 28.6% 42.8%'
                            }}
                        >
                            <NavLink
                                activeStyle={{
                                    backgroundColor: 'rgb(243,158,49)',
                                    borderStyle: 'solid solid solid none',
                                    borderWidth: '1px',
                                    borderColor: 'rgb(104,199,197)'
                                }}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderStyle: 'solid solid solid none',
                                    borderWidth: '1px',
                                    borderColor: 'rgb(104,199,197)',
                                    backgroundColor: 'rgb(13,109,121)',
                                    textDecoration: 'none',
                                    color: 'white',
                                    fontSize: '22px',
                                    fontWeight: 500,
                                    letterSpacing: '1px',
                                    paddingTop: '10px'
                                }}
                                to={airportInfoNamespace}
                            >
                                AIRPORT INFO
                            </NavLink>
                            <AirportMapModal />
                            <Clock />
                        </div>
                        <div style={{ width: '100vw', height: '8vh' }}>
                            <Route component={MainTabList} />
                        </div>
                        <img
                            className="menu--shadow"
                            src={require(`./MainTab/icons/Button-Shadow.png`)}
                            alt="sidebar_logo"
                            width="1080"
                        />
                        {isIdle ? (
                            <div style={{ width: '100%', height: '74vh' }}>
                                {this.props.adVideoList.status === 200 &&
                                    this.props.advertisementList.status ===
                                        200 &&
                                    this.props.featuredAdvertisementList
                                        .status === 200 && <RestComponent />}
                            </div>
                        ) : (
                            <div>
                                <div style={{ width: '100vw', height: '54vh' }}>
                                    <Route
                                        exact
                                        path={destinationNamespace}
                                        component={DestinationList}
                                    />
                                    <Route
                                        exact
                                        path={accomodationNamespace}
                                        component={DestinationList}
                                    />
                                    <Route
                                        exact
                                        path={destinationNamespace + '/:id'}
                                        component={DestinationDetail}
                                    />
                                    <Route
                                        exact
                                        path={accomodationNamespace + '/:id'}
                                        component={HotelList}
                                    />
                                    <Route
                                        exact
                                        path={
                                            accomodationNamespace +
                                            '/:destid/:accoid'
                                        }
                                        component={HotelDetail}
                                    />
                                    <Route
                                        exact
                                        path={eventNamespace}
                                        component={EventList}
                                    />
                                    <Route
                                        exact
                                        path={eventNamespace + '/:id'}
                                        component={EventDetail}
                                    />
                                    <Route
                                        exact
                                        path={diningNamespace}
                                        component={DiningList}
                                    />
                                    <Route
                                        exact
                                        path={diningNamespace + '/:id'}
                                        component={DiningDetail}
                                    />
                                    <Route
                                        exact
                                        path={serviceNamespace}
                                        component={ServiceInitialList}
                                    />
                                    <Route
                                        exact
                                        path={essentialNamespace}
                                        component={ServiceTypeList}
                                    />
                                    <Route
                                        exact
                                        path={essentialNamespace + '/:serid'}
                                        component={ServiceList}
                                    />
                                    <Route
                                        exact
                                        path={
                                            essentialNamespace +
                                            '/:serid/:serid2'
                                        }
                                        component={ServiceDetail}
                                    />
                                    <Route
                                        exact
                                        path={miningNamespace}
                                        component={ServiceTypeList}
                                    />
                                    <Route
                                        exact
                                        path={miningNamespace + '/:serid'}
                                        component={ServiceList}
                                    />
                                    <Route
                                        exact
                                        path={
                                            miningNamespace + '/:serid/:serid2'
                                        }
                                        component={ServiceDetail}
                                    />
                                    <Route
                                        exact
                                        path={retailNamespace}
                                        component={ServiceTypeList}
                                    />
                                    <Route
                                        exact
                                        path={retailNamespace + '/:serid'}
                                        component={ServiceList}
                                    />
                                    <Route
                                        exact
                                        path={
                                            retailNamespace + '/:serid/:serid2'
                                        }
                                        component={ServiceDetail}
                                    />
                                    <Route
                                        exact
                                        path={transportNamespace}
                                        component={ServiceTypeList}
                                    />
                                    <Route
                                        exact
                                        path={transportNamespace + '/:serid'}
                                        component={ServiceList}
                                    />
                                    <Route
                                        exact
                                        path={
                                            transportNamespace +
                                            '/:serid/:serid2'
                                        }
                                        component={ServiceDetail}
                                    />
                                    <Route
                                        exact
                                        path={activityNamespace}
                                        component={ActivityList}
                                    />
                                    <Route
                                        exact
                                        path={activityNamespace + '/:id'}
                                        component={ActivityDestinationList}
                                    />
                                    <Route
                                        exact
                                        path={
                                            activityNamespace + '/:id/:destid'
                                        }
                                        component={ActivityDestinationDetail}
                                    />
                                    <Route
                                        exact
                                        path={mapListNamespace}
                                        component={MapList}
                                    />
                                    <Route
                                        exact
                                        path={airportInfoNamespace}
                                        component={AirportInfo}
                                    />
                                    <Redirect
                                        from="/"
                                        to={destinationNamespace}
                                    />
                                </div>
                                <div
                                    style={{
                                        width: '100vw',
                                        height: '16vh',
                                        zIndex: '99',
                                        position: 'relative'
                                    }}
                                >
                                    {!isIdle &&
                                        this.props.adVideoList.status === 200 &&
                                        this.props.advertisementList.status ===
                                            200 &&
                                        this.props
                                            .specificAdsActivityDestinationList
                                            .status === 200 &&
                                        this.props.specificAdsEssentialList
                                            .status === 200 &&
                                        this.props.specificAdsMiningList
                                            .status === 200 &&
                                        this.props.specificAdsRestaurantList
                                            .status === 200 &&
                                        this.props.specificAdsRetailList
                                            .status === 200 &&
                                        this.props.specificAdsTransportList
                                            .status === 200 &&
                                        this.props.specificAdsAccommodationList
                                            .status === 200 &&
                                        this.props.specificAdsEventList
                                            .status === 200 && (
                                            <Route
                                                render={props => (
                                                    <Advertisement
                                                        // continuePlaying={!isIdle}
                                                        continuePlaying={true}
                                                        {...props}
                                                    />
                                                )}
                                            />
                                        )}
                                </div>
                                <div
                                    style={{
                                        width: '100vw',
                                        height: '4vh',
                                        display: 'flex',
                                        backgroundColor: '#058c9b',
                                        color: 'white',
                                        zIndex: '99',
                                        position: 'relative'
                                    }}
                                >
                                    <div
                                        style={{
                                            flex: 1,
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <span
                                            style={{
                                                marginLeft: 20,
                                                marginRight: 5
                                            }}
                                        >
                                            &copy;
                                        </span>JBG HOSPITALITY 2018
                                    </div>
                                    <div
                                        style={{
                                            flex: 1,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'flex-end',
                                            marginRight: 20
                                        }}
                                    >
                                        WWW.JBG.COM.PG
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </Router>
            );
        }
    }
}

function mapStateToProps({
    windowSize,
    adVideoList,
    adVideo,
    advertisementList,
    specificAdsActivityDestinationList,
    specificAdsEssentialList,
    specificAdsMiningList,
    specificAdsRestaurantList,
    specificAdsRetailList,
    specificAdsTransportList,
    featuredAdvertisementList,
    destinationList,
    accommodationList,
    restaurantList,
    eventList,
    map,
    periodList,
    essentialServiceTypeList,
    miningServiceTypeList,
    retailServiceTypeList,
    transportServiceTypeList,
    specificAdsAccommodationList,
    specificAdsEventList,
    activityList,
    airport
}) {
    return {
        windowSize,
        adVideoList,
        adVideo,
        advertisementList,
        specificAdsActivityDestinationList,
        specificAdsEssentialList,
        specificAdsMiningList,
        specificAdsRestaurantList,
        specificAdsRetailList,
        specificAdsTransportList,
        featuredAdvertisementList,
        destinationList,
        accommodationList,
        restaurantList,
        eventList,
        map,
        periodList,
        essentialServiceTypeList,
        miningServiceTypeList,
        retailServiceTypeList,
        transportServiceTypeList,
        specificAdsAccommodationList,
        specificAdsEventList,
        activityList,
        airport
    };
}
export default connect(mapStateToProps, actions)(App);
