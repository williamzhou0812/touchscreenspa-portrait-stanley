import React from 'react';
import { connect } from 'react-redux';
import SubsectionList from '../List/SubsectionList';
import { eventNamespace } from "../Constants";

class DestinationList extends React.Component {
    render() {
        const { events } = this.props.eventList;
        return (
            <div style={{width: "100%", height: "100%"}}>
               <SubsectionList
                    data={events}
                    sideTitle="EVENTS"
                    mainTitle="CALENDAR OF EVENTS"
                    imageKey="imageEvent"
                    isImageArray={true}
                    namespace={eventNamespace}
                    renderText={(item) => {
                        return (
                            <div style={{height: "100%"}}>
                                <div style={{height: "33%", display: "flex", alignItems: "flex-end"}}>{item.title.toUpperCase()}</div>
                                <div style={{height: "33%", display: "flex", alignItems: "flex-end"}}>{item.eventMonth.toUpperCase()}</div>
                            </div>
                        );
                    }}
                />
            </div>
        );
    }
}

const mapStateToProps = ({ eventList }) => {
    return {
        eventList
    }
}


export default connect(mapStateToProps)(DestinationList);