import { combineReducers } from 'redux';
import windowSizeReducer from './windowSizeReducer';
import destinationsReducer from './destinationReducer';
import destinationsReducerDetail from './destinationDetailReducer';
import diningDetailReducer from './diningDetailReducer';
import mapReducer from './mapReducer';
import periodReducer from './periodReducer';
import diningReducer from './diningReducer';
import activityListReducer from './activityListReducer';
import activityDestinationListReducer from './activityDestinationListReducer';
import activityDestinationDetailReducer from './activityDestinationDetailReducer';
import accommodationReducer from './accommodationReducer';
import essentialServiceTypeListReducer from './essentialServiceTypeListReducer';
import miningServiceTypeListReducer from './miningServiceTypeListReducer';
import retailServiceTypeListReducer from './retailServiceTypeListReducer';
import transportServiceTypeListReducer from './transportServiceTypeListReducer';
import adVideoListReducer from './adVideoListReducer';
import advertisementReducer from './advertisementReducer';
import featuredAdvertisementReducer from './featuredAdvertisementReducer';
import specificAdsActivityDestinationReducer from './specificAdsActivityDestinationReducer';
import specificAdsEssentialReducer from './specificAdsEssentialReducer';
import specificAdsMiningReducer from './specificAdsMiningReducer';
import specificAdsRestaurantReducer from './specificAdsRestaurantReducer';
import specificAdsRetailReducer from './specificAdsRetailReducer';
import specificAdsTransportReducer from './specificAdsTransportReducer';
import HandoverVideoReducer from './HandoverVideoReducer';
import eventReducer from './eventReducer'

export default combineReducers({
    windowSize: windowSizeReducer,
    destinationList: destinationsReducer,
    destinationDetail: destinationsReducerDetail,
    map: mapReducer,
    periodList: periodReducer,
    accommodationList: accommodationReducer,
    restaurantList: diningReducer,
    restaurantDetail: diningDetailReducer,
    eventList: eventReducer,
    activityDestinationList: activityDestinationListReducer,
    activityDestinationDetail: activityDestinationDetailReducer,
    essentialServiceTypeList: essentialServiceTypeListReducer,
    miningServiceTypeList: miningServiceTypeListReducer,
    retailServiceTypeList: retailServiceTypeListReducer,
    transportServiceTypeList: transportServiceTypeListReducer,
    adVideoList: adVideoListReducer,
    advertisementList: advertisementReducer,
    featuredAdvertisementList: featuredAdvertisementReducer,
    specificAdsActivityDestinationList: specificAdsActivityDestinationReducer,
    specificAdsEssentialList: specificAdsEssentialReducer,
    specificAdsMiningList: specificAdsMiningReducer,
    specificAdsRestaurantList: specificAdsRestaurantReducer,
    specificAdsRetailList: specificAdsRetailReducer,
    specificAdsTransportList: specificAdsTransportReducer,
    handoverVideoData: HandoverVideoReducer
});
