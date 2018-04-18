import React from 'react';
import './Tab.css';
import { MediumBlue, HeavyBlue, ExtraHeavyBlueGreen } from '../Constants';

class Tab extends React.Component {
    render() {
        const itemFontSize = '12pt';

        const {
            name,
            icon,
            iconWidth,
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
                    <img
                        alt=""
                        src={icon}
                        style={{
                            marginTop: 10,
                            width: !!iconWidth ? iconWidth : '50%'
                        }}
                    />
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'flex-end',
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
                    <img
                        alt=""
                        src={icon}
                        style={{
                            marginTop: 10,
                            width: !!iconWidth ? iconWidth : '50%'
                        }}
                    />
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'flex-end',
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
                    <img
                        alt=""
                        src={icon}
                        style={{
                            marginTop: 10,
                            width: !!iconWidth ? iconWidth : '50%'
                        }}
                    />
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'flex-end',
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
                    <img
                        alt=""
                        src={icon}
                        style={{
                            marginTop: 10,
                            width: !!iconWidth ? iconWidth : '50%'
                        }}
                    />
                    <div
                        style={{
                            flex: 1,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'flex-end',
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
