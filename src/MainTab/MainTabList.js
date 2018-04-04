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
    airportMapNamespace,
    airportInfoNamespace,
    shiftArray
} from '../Constants';

class MainTabList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabs: [
                {name: 'SERVICES', path: serviceNamespace},
                {name: 'MAPS', path: mapListNamespace},
                {name: 'ACTIVITIES', path: activityNamespace},
                {name: 'DESTINATIONS', path: destinationNamespace},
                {name: 'EVENTS', path: eventNamespace},
                {name: 'DINING', path: diningNamespace},
                {name: 'HOTELS', path: accomodationNamespace}
            ],
            sameClicked: false,
            performClick: false
        }
        this.clickItem = this.clickItem.bind(this);
    }
    middle = 3;
    clickItem(clickedTab, clickIndex) {
        const { tabs } = this.state;
        if (clickedTab === tabs[this.middle]) {
            this.setState({ sameClicked: true, performClick: true, });
        } else {
            const tempTabs = shiftArray(tabs, this.middle - clickIndex);
            this.setState({
                tabs: tempTabs,
                sameClicked: false,
                performClick: true,
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
                this.setState({ performClick: false, });
            }
        } else if (location.pathname !== tabs[this.middle].path && performClick) {
            //Only perform redirect if a performClick on one of the Main Tab is done
            history.replace(tabs[this.middle].path);
            this.setState({ performClick: false, });
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
                        performClick: false,
                    });
                }
            });
        }
    }
    shouldShowSelectedStyle() {
        const { location: { pathname } } = this.props;
        return !(pathname === airportMapNamespace || pathname === airportInfoNamespace);
    }
    render() {
        const { tabs } = this.state;
        return(
            <div style={{width: "100%", height: "100%", display: "grid", gridTemplateColumns: `repeat(${tabs.length}, 1fr)`}}>
                {tabs.map((t, i) => {
                    // const showSelectedStyle = this.shouldShowSelectedStyle();
                    const selected = i === this.middle;
                    const isLeftOfSelected = i === (this.middle - 1);
                    const isLastItem = i === (tabs.length - 1);
                    return (
                        <Tab key={i} name={t.name} selected={selected} isLeftOfSelected={isLeftOfSelected}
                            isLastItem={isLastItem}
                            onClick={() => {
                                 this.clickItem(t, i);
                             }
                        }/>
                    );
                })}
            </div>
        );
    }
}

export default MainTabList;