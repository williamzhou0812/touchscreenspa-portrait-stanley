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

class App extends Component {
    render() {
        return (
            <Router history={this.props.history}>
                <div className="App">
                    <img style={{width: "100vw", height: "15vh"}} src={MainLogo} />
                    <div style={{width: "100vw", height: "4vh", display: "grid", gridTemplateColumns: "30% 30% 40%"}}>
                        <div>AIRPORT INFO</div>
                        <div>AIRPORT MAP</div>
                        <Clock />
                    </div>
                    <div style={{width: "100vw", height: "8vh"}}>
                        <Route component={MainTabList} />
                    </div>
                </div>
            </Router>
        );
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
    activityList,
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
        activityList,
        map,
        periodList,
        essentialServiceTypeList,
        miningServiceTypeList,
        retailServiceTypeList,
        transportServiceTypeList
    };
}
export default connect(mapStateToProps, actions)(App);
