import { combineReducers } from "redux";
import windowSizeReducer from "./windowSizeReducer";
import destinationsReducer from "./destinationReducer";
import destinationsReducerDetail from "./destinationDetailReducer";
import diningDetailReducer from "./diningDetailReducer";
import mapReducer from "./mapReducer";
import periodReducer from "./periodReducer";
import diningReducer from "./diningReducer";
import activityListReducer from "./activityListReducer";
import activityDestinationListReducer from "./activityDestinationListReducer";
import activityDestinationDetailReducer from "./activityDestinationDetailReducer";
import accommodationReducer from "./accommodationReducer";
import essentialServiceTypeListReducer from "./essentialServiceTypeListReducer";
import miningServiceTypeListReducer from "./miningServiceTypeListReducer";
import retailServiceTypeListReducer from "./retailServiceTypeListReducer";
import transportServiceTypeListReducer from "./transportServiceTypeListReducer";
import adVideoListReducer from "./adVideoListReducer";
import advertisementReducer from "./advertisementReducer";
import featuredAdvertisementReducer from "./featuredAdvertisementReducer";
import showcaseAdvertisementReducer from "./showcaseAdvertisementReducer";
import specificAdsActivityDestinationReducer from "./specificAdsActivityDestinationReducer";
import specificAdsEssentialReducer from "./specificAdsEssentialReducer";
import specificAdsMiningReducer from "./specificAdsMiningReducer";
import specificAdsRestaurantReducer from "./specificAdsRestaurantReducer";
import specificAdsRetailReducer from "./specificAdsRetailReducer";
import specificAdsTransportReducer from "./specificAdsTransportReducer";
import specificAdsAccommodationReducer from "./specificAdsAccommodationReducer";
import specificAdsEventReducer from "./specificAdsEventReducer";
import HandoverVideoReducer from "./HandoverVideoReducer";
import eventReducer from "./eventReducer";
import airportReducer from "./airportReducer";
import searchDocumentReducer from "./searchDocumentReducer";
import searchResultReducer from "./searchResultReducer";
import displaySearchResultsBooleanReducer from "./displaySearchResultsBooleanReducer";
import showKeyboardReducer from "./showKeyboardReducer";
import showSearchBarReducer from "./showSearchBarReducer";
import showKeyboardOutAnimationReducer from "./showKeyboardOutAnimationReducer";
import showSearchBarOutAnimationReducer from "./showSearchBarOutAnimationReducer";

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
    activityList: activityListReducer,
    activityDestinationList: activityDestinationListReducer,
    activityDestinationDetail: activityDestinationDetailReducer,
    essentialServiceTypeList: essentialServiceTypeListReducer,
    miningServiceTypeList: miningServiceTypeListReducer,
    retailServiceTypeList: retailServiceTypeListReducer,
    transportServiceTypeList: transportServiceTypeListReducer,
    adVideoList: adVideoListReducer,
    advertisementList: advertisementReducer,
    showcaseAdvertisementList: showcaseAdvertisementReducer,
    featuredAdvertisementList: featuredAdvertisementReducer,
    specificAdsActivityDestinationList: specificAdsActivityDestinationReducer,
    specificAdsEssentialList: specificAdsEssentialReducer,
    specificAdsMiningList: specificAdsMiningReducer,
    specificAdsRestaurantList: specificAdsRestaurantReducer,
    specificAdsRetailList: specificAdsRetailReducer,
    specificAdsTransportList: specificAdsTransportReducer,
    specificAdsAccommodationList: specificAdsAccommodationReducer,
    specificAdsEventList: specificAdsEventReducer,
    handoverVideoData: HandoverVideoReducer,
    airport: airportReducer,
    searchDocuments: searchDocumentReducer,
    searchResult: searchResultReducer,
    displaySearchResultsBoolean: displaySearchResultsBooleanReducer,
    showKeyboard: showKeyboardReducer,
    showSearchBarBoolean: showSearchBarReducer,
    showKeyboardOutAnimation: showKeyboardOutAnimationReducer,
    showSearchBarOutAnimation: showSearchBarOutAnimationReducer
});
