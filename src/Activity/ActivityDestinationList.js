import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/activity';
import { DECIMAL_RADIX, activityNamespace } from '../Constants';
import SubsectionList from '../List/SubsectionList';
import ActivityIcon from '../MainTab/icons/ACTIVITIES_ICON.png';
import ActivityMapIcon from '../Hotel/icons/HotelsMapIcon.png';

class ActivityDestinationList extends React.Component {
    retrieveData() {
        const id = parseInt(this.props.match.params.id, DECIMAL_RADIX);
        const { activities } = this.props;
        this.props.fetchActivityDestinationList(id, activities);
    }
    componentDidMount() {
        this.retrieveData();
    }
    componentDidUpdate(prevProps) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.retrieveData();
        }
    }
    componentWillUnmount() {
        this.props.resetActivityDestinationList();
    }
    render() {
        const { activity, status } = this.props;
        return (
            <div
                style={{ height: '100%' }}
                className="section--bottom--animation"
            >
                {status === 200 && (
                    <SubsectionList
                        data={activity.activityDestinationActivity}
                        imageKey="imageActivityDestination"
                        isImageArray={true}
                        sideButtons={[
                            {
                                title: 'ALL ACTIVITIES',
                                icon: ActivityIcon,
                                isLink: true,
                                link: activityNamespace
                            },
                            {
                                title: `${activity.title.toUpperCase()} MAP`,
                                icon: ActivityMapIcon,
                                isMap: true
                            }
                        ]}
                        sideTitle="ACTIVITIES"
                        mainTitle={activity.title.toUpperCase()}
                        namespace={`${activityNamespace}/${activity.id}`}
                        randomise={false}
                        maps={activity.mapActivity}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = ({ activityList, activityDestinationList }) => {
    const { activities } = activityList;
    const { activity, status } = activityDestinationList;
    return {
        activities,
        activity,
        status
    };
};
export default connect(mapStateToProps, actions)(ActivityDestinationList);
