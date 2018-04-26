import React from 'react';
import Tab from './Tab';
import {
    accomodationNamespace,
    eventNamespace,
    diningNamespace,
    destinationNamespace,
    serviceNamespace,
    mapListNamespace,
    activityNamespace,
    airportInfoNamespace,
    shiftArray
} from '../Constants';
import AccommodationIcon from './icons/ACCOMMODATION_ICON.png';
import ActivitiesIcon from './icons/ACTIVITIES_ICON.png';
import DestinationsIcon from './icons/DESTINATIONS_ICON.png';
import DiningIcon from './icons/DINING_ICON.png';
import EventsIcon from './icons/EVENTS_ICON.png';
import ServicesIcon from './icons/SERVICES_ICON.png';
import MapListIcon from './icons/MAP_LIST_ICON.png';

class MainTabList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabs: [
                {
                    name: 'SERVICES',
                    path: serviceNamespace,
                    icon: ServicesIcon,
                    iconWidth: '70px'
                },
                {
                    name: 'MAPS',
                    path: mapListNamespace,
                    icon: MapListIcon,
                    iconWidth: '70px'
                },
                {
                    name: 'ACTIVITIES',
                    path: activityNamespace,
                    icon: ActivitiesIcon,
                    iconWidth: '70px'
                },
                {
                    name: 'DESTINATIONS',
                    path: destinationNamespace,
                    icon: DestinationsIcon,
                    iconWidth: '90px'
                },
                {
                    name: 'EVENTS',
                    path: eventNamespace,
                    icon: EventsIcon,
                    iconWidth: '70px'
                },
                {
                    name: 'DINING',
                    path: diningNamespace,
                    icon: DiningIcon,
                    iconWidth: '70px'
                },
                {
                    name: 'HOTELS',
                    path: accomodationNamespace,
                    icon: AccommodationIcon,
                    iconWidth: '70px'
                }
            ],
            sameClicked: false,
            performClick: false
        };
        this.clickItem = this.clickItem.bind(this);
    }
    middle = 3;
    clickItem(clickedTab, clickIndex) {
        const { tabs } = this.state;
        if (clickedTab === tabs[this.middle]) {
            this.setState({ sameClicked: true, performClick: true });
        } else {
            const tempTabs = shiftArray(tabs, this.middle - clickIndex);
            this.setState({
                tabs: tempTabs,
                sameClicked: false,
                performClick: true
            });
        }
    }
    componentDidUpdate() {
        // Update route according to middle tab...
        const { history, location } = this.props;
        const { tabs, sameClicked, performClick } = this.state;
        if (location.pathname.includes(tabs[this.middle].path)) {
            if (sameClicked && performClick) {
                //If clicked on the same main tab even though similar location, force redirect
                history.replace(tabs[this.middle].path);
                this.setState({ performClick: false });
            }
        } else if (
            location.pathname !== tabs[this.middle].path &&
            performClick
        ) {
            //Only perform redirect if a performClick on one of the Main Tab is done
            history.replace(tabs[this.middle].path);
            this.setState({ performClick: false });
        } else if (location.pathname !== tabs[this.middle].path) {
            //Perform tab changing due to automatic redirection
            tabs.forEach((tab, index) => {
                if (location.pathname.includes(tab.path)) {
                    //Change the tabs array based on the difference of the middle and current location pathname
                    const tempTabs = shiftArray(tabs, this.middle - index);
                    this.setState({
                        tabs: tempTabs,
                        tab: tempTabs[this.middle].name,
                        sameClicked: false,
                        performClick: false
                    });
                }
            });
        }
    }
    render() {
        const { tabs } = this.state;
        const { pathname } = this.props.location;
        return (
            <div style={{ width: '100%', height: '100%', display: 'flex' }}>
                {tabs.map((t, i) => {
                    //Selected style does not come into effect if we are currently in airport info namespace
                    const selected = i === this.middle && (!(pathname.includes(airportInfoNamespace)));
                    const isLeftOfSelected = i === this.middle - 1  && (!(pathname.includes(airportInfoNamespace)));
                    const isLastItem = i === tabs.length - 1;
                    return (
                        <Tab
                            key={i}
                            name={t.name}
                            icon={t.icon}
                            iconWidth={t.iconWidth}
                            selected={selected}
                            isLeftOfSelected={isLeftOfSelected}
                            isLastItem={isLastItem}
                            onClick={() => {
                                this.clickItem(t, i);
                            }}
                        />
                    );
                })}
            </div>
        );
    }
}

export default MainTabList;
