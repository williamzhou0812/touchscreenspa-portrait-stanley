import React from 'react';
import './Tab.css';
import { MediumBlue, HeavyBlue, ExtraHeavyBlueGreen } from '../Constants';

class Tab extends React.Component {
    render() {
        const itemFontSize = '12pt';

        const {
            name,
            selected,
            isLeftOfSelected,
            isLastItem, 
            isRightOfSelected,
            // fetchDestinationList,
            // fetchDestinationDetail,
            // fetchDiningList,
            // fetchMapList,
            // fetchActivityList,
            // fetchPeriodList,
            // fetchAccommodationList,
            // fetchDiningDetail,
            // fetchActivityDestinationList,
            // fetchActivityDestinationDetail,
            // fetchActivityDestinationDetailAvailableData,
            // resetActivityDestinationDetail,
            // fetchEssentialTypeList,
            // fetchMiningTypeList,
            // fetchRetailTypeList,
            // fetchTransportTypeList,
            // fetchAdVideoList,
            // resetAdVideo,
            // fetchAdvertisementList,
            // fetchFeaturedAdvertisementList,
            // fetchSpecificAdsRestaurantList,
            // fetchSpecificAdsActivityDestinationList,
            // fetchSpecificAdsEssentialList,
            // fetchSpecificAdsMiningList,
            // fetchSpecificAdsRetailList,
            // fetchSpecificAdsTransportList,
            // retrieveHandoverVideo,
            ...other
        } = this.props;
        if (selected) {
            return (
                <div className="item-tab selected" {...other}>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontSize: itemFontSize
                        }}
                    >
                        {name}
                    </div>
                </div>
            );
        } else if (isLeftOfSelected) {
            return (
                <div className="item-tab left-selected" {...other}>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontSize: itemFontSize
                        }}
                    >
                        {name}
                    </div>
                </div>
            );
        } else if (isLastItem) {
            return (
                <div className="item-tab last-item" {...other}>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontSize: itemFontSize
                        }}
                    >
                        {name}
                    </div>
                </div>
            );
        } else {
            // let { iconWidth, marginBottomIcon } = this.props;
            // if (!iconWidth) {
            //     iconWidth = '50%';
            // }
            return (
                <div className="item-tab not-selected" {...other}>
                    {/* <img
                        alt=""
                        src={icon}
                        style={{
                            marginBottom: marginBottomIcon,
                            width: iconWidth
                        }}
                    /> */}
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontSize: itemFontSize
                        }}
                    >
                        {name}
                    </div>
                </div>
            );
        }
    }
}
export default Tab;
