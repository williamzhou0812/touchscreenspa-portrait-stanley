import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Clock from "./Clock";
import MainLogo from "./interface/main_logo.png";
import MainTabList from "./MainTab/MainTabList";
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
    playRandomSoundEffect
} from './Constants';
import DestinationList from './Destination/DestinationList';
import DestinationDetail from './Destination/DestinationDetail';
import EventList from './Event/EventList';
import EventDetail from "./Event/EventDetail";
import DiningList from "./Dining/DiningList";
import DiningDetail from "./Dining/DiningDetail";

class App extends Component {
    componentDidMount() {
        this.props.fetchDestinationList();
        this.props.fetchEventList();
        this.props.fetchAccommodationList();
        this.props.fetchDiningList();
    }
    render() {
        if (
            this.props.destinationList.status !== 200 ||
            this.props.accommodationList.status !== 200 ||
            this.props.eventList.status !== 200 ||
            this.props.restaurantList.status !== 200

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
                    <div className="App">
                        <img style={{width: "100vw", height: "15vh"}} src={MainLogo} />
                        <div style={{width: "100vw", height: "3vh", display: "grid", gridTemplateColumns: "30% 30% 40%"}}>
                            <div style={{width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>AIRPORT INFO</div>
                            <div style={{width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>AIRPORT MAP</div>
                            <Clock />
                        </div>
                        <div style={{width: "100vw", height: "8vh"}}>
                            <Route component={MainTabList} />
                        </div>
                        <div style={{width: "100vw", height: "54vh"}}>
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
                                path={destinationNamespace + "/:id"}
                                component={DestinationDetail}
                            />
                            <Route
                                exact
                                path={eventNamespace}
                                component={EventList}
                            />
                            <Route
                                exact
                                path={eventNamespace + "/:id"}
                                component={EventDetail}
                            />
                            <Route
                                exact
                                path={diningNamespace}
                                component={DiningList}
                            />
                            <Route
                                exact
                                path={diningNamespace + "/:id"}
                                component={DiningDetail}
                            />
                            <Redirect from="/" to={destinationNamespace} />
                        </div>
                        <div style={{width: "100vw", height: "16vh"}}>
                            Advertisement Section
                        </div>
                        <div style={{width: "100vw", height: "4vh", display: "flex"}}>
                            <div style={{flex: 1, display: "flex", alignItems: "center"}}>
                                <span style={{marginLeft: 20, marginRight: 5}}>&copy;</span>JBG HOSPITALITY 2018
                            </div>
                            <div style={{flex: 1, display: "flex", alignItems: "center", justifyContent: "flex-end", marginRight: 20}}>
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
    transportServiceTypeList
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
        transportServiceTypeList
    };
}
export default connect(mapStateToProps, actions)(App);
