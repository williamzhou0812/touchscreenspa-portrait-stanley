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
    tourNamespace,
    essentialNamespace,
    transportNamespace,
    retailNamespace,
    miningNamespace,
    airportInfoNamespace,
    airportMapNamespace,
    IDLE_TIME,
    SelectedBorderColor,
    MediumBlue,
    playRandomSoundEffect,
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
import ActivityList from './Activity/ActivityList';
import ActivityDestinationList from './Activity/ActivityDestinationList';
import ActivityDestinationDetail from './Activity/ActivityDestinationDetail';

class App extends Component {
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
    }
    render() {
        if (
            this.props.destinationList.status !== 200 ||
            this.props.accommodationList.status !== 200 ||
            this.props.eventList.status !== 200 ||
            this.props.restaurantList.status !== 200 ||
            this.props.activityList.status !== 200 ||
            this.props.essentialServiceTypeList.status !== 200 ||
            this.props.miningServiceTypeList.status !== 200 ||
            this.props.retailServiceTypeList.status !== 200 ||
            this.props.transportServiceTypeList.status !== 200
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
                        <img
                            style={{ width: '100vw', height: '15vh' }}
                            src={MainLogo}
                        />
                        <div
                            style={{
                                width: '100vw',
                                height: '3vh',
                                display: 'grid',
                                gridTemplateColumns: '30% 30% 40%'
                            }}
                        >
                            <div
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                AIRPORT INFO
                            </div>
                            <div
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                AIRPORT MAP
                            </div>
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
                                    accomodationNamespace + '/:destid/:accoid'
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
                                path={miningNamespace}
                                component={ServiceTypeList}
                            />
                            <Route
                                exact
                                path={retailNamespace}
                                component={ServiceTypeList}
                            />
                            <Route
                                exact
                                path={transportNamespace}
                                component={ServiceTypeList}
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
                                path={activityNamespace + '/:id/:destid'}
                                component={ActivityDestinationDetail}
                            />
                            <Redirect from="/" to={destinationNamespace} />
                        </div>
                        <div style={{ width: '100vw', height: '16vh' }}>
                            Advertisement Section
                        </div>
                        <div
                            style={{
                                width: '100vw',
                                height: '4vh',
                                display: 'flex',
                                backgroundColor: '#058c9b',
                                color: 'white'
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
                                    style={{ marginLeft: 20, marginRight: 5 }}
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
    activityList
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
        activityList
    };
}
export default connect(mapStateToProps, actions)(App);
