import { fetchDestinationList, fetchDestinationDetail } from './destination';
import { fetchDiningList, fetchDiningDetail } from './dining';
import { fetchMapList } from './map';
import { getWindowSize } from './windowSize';
import {
    fetchActivityList,
    fetchActivityDestinationList,
    fetchActivityDestinationDetail,
    fetchActivityDestinationDetailAvailableData,
    resetActivityDestinationDetail
} from './activity';
import { fetchPeriodList } from './period';
import { fetchAccommodationList } from './accommodation';
import {
    fetchEssentialTypeList,
    fetchMiningTypeList,
    fetchRetailTypeList,
    fetchTransportTypeList
} from './service';
import { fetchAdVideoList, resetAdVideo, retrieveHandoverVideo } from './video';
import {
    fetchAdvertisementList,
    fetchFeaturedAdvertisementList,
    fetchSpecificAdsRestaurantList,
    fetchSpecificAdsActivityDestinationList,
    fetchSpecificAdsEssentialList,
    fetchSpecificAdsMiningList,
    fetchSpecificAdsRetailList,
    fetchSpecificAdsTransportList,
    fetchSpecificAccommodationList,
    fetchSpecificAdsEventList
} from './advertisement';
import { fetchEventList } from './event';
import { fetchAirportDetail } from './airport';
import {
    setSearchDocuments,
    setDisplaySearchResultsBoolean,
    setSearchResults,
    setShowSearchBarBoolean,
    resetSearchResults,
    setShowSearchBarOutAnimation
} from './search';
import { setShowKeyboard, setShowKeyboardOutAnimation } from './keyboard';

export {
    fetchDestinationList,
    fetchDestinationDetail,
    fetchDiningList,
    fetchDiningDetail,
    fetchMapList,
    getWindowSize,
    fetchActivityList,
    fetchActivityDestinationList,
    fetchActivityDestinationDetail,
    fetchActivityDestinationDetailAvailableData,
    resetActivityDestinationDetail,
    fetchPeriodList,
    fetchAccommodationList,
    fetchEssentialTypeList,
    fetchMiningTypeList,
    fetchRetailTypeList,
    fetchTransportTypeList,
    fetchAdVideoList,
    resetAdVideo,
    fetchAdvertisementList,
    fetchFeaturedAdvertisementList,
    fetchSpecificAdsRestaurantList,
    fetchSpecificAdsActivityDestinationList,
    fetchSpecificAdsEssentialList,
    fetchSpecificAdsMiningList,
    fetchSpecificAdsRetailList,
    fetchSpecificAdsTransportList,
    fetchSpecificAccommodationList,
    fetchSpecificAdsEventList,
    retrieveHandoverVideo,
    fetchEventList,
    fetchAirportDetail,
    setSearchDocuments,
    setDisplaySearchResultsBoolean,
    setSearchResults,
    setShowKeyboard,
    setShowSearchBarBoolean,
    resetSearchResults,
    setShowKeyboardOutAnimation,
    setShowSearchBarOutAnimation
};
