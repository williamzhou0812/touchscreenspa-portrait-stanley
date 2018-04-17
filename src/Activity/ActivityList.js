import React from 'react'
import { connect } from "react-redux";
import SectionList from "../List/SectionList";
import { activityNamespace } from '../Constants';

class ActivityList extends React.Component {
    render() {
        const { activities, images } = this.props;
        return (
            <SectionList
                data={activities}
                images={images}
                title="ACTIVITIES"
                namespace={activityNamespace}
            />
        );
    }
}

const mapStateToProps = ({ activityList }) => {
    const { activities, images } = activityList;
    return {
        activities,
        images
    }
}
export default connect(mapStateToProps, null)(ActivityList);