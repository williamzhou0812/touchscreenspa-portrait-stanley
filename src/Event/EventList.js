import React from 'react';
import { connect } from 'react-redux';
import SectionList from '../List/SectionList';
import { eventNamespace } from "../Constants";

class DestinationList extends React.Component {
    render() {
        const { events, images } = this.props.eventList;
        return (
            <div style={{width: "100%", height: "100%"}}>
               <SectionList
                    data={events}
                    images={images}
                    title="EVENTS"
                    namespace={eventNamespace}
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