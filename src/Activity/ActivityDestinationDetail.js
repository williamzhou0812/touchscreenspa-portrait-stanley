import React from 'react'
import { connect } from "react-redux";
import * as actions from "../actions/activity";
import { DECIMAL_RADIX, activityNamespace, HeavyOrange } from '../Constants';
import { Link } from "react-router-dom";
import  ActivityIcon from "../MainTab/icons/ACTIVITIES_ICON.png";
import ActivityMapIcon from "../Hotel/icons/HotelsMapIcon.png";

class ActivityDestinationDetail extends React.Component {
    retrieveData() {
        const id = parseInt(this.props.match.params.destid, DECIMAL_RADIX);
        const { activity } = this.props;
        this.props.fetchActivityDestinationDetailAvailableData(id, activity);
    }
    componentDidMount() {
        this.retrieveData();
    }
    componentDidUpdate(prevProps) {
        if (prevProps.match.params.destid !== this.props.match.params.destid) {
            this.retrieveData();
        }
    }
    getPrevLink() {
        const { activityDestination, activity, index, status } = this.props;
        const { activityDestinationActivity : dests } = activityDestination;
        let output = `${activityNamespace}/${this.props.match.params.id}`;
        if (index === 0) {
            return `${output}/${dests[dests.length - 1].id}`;
        } else {
            return `${output}/${dests[index - 1].id}`;
        }
    }
    getNextLink() {
        const { activityDestination, activity, index, status } = this.props;
        const { activityDestinationActivity : dests } = activityDestination;
        let output = `${activityNamespace}/${this.props.match.params.id}`;
        if (index === (dests.length - 1)) {
            return `${output}/${dests[0].id}`;
        } else {
            return `${output}/${dests[index + 1].id}`;
        }
    }
    render() {
        const { activity, activityDestination : dest, index, status } = this.props;
        return (
            <div style={{width: "100%", height: "100%", display: "flex", color: "white"}}>
                <div style={{backgroundColor: HeavyOrange, width: "14%", boxShadow: "9.899px 0px 7px 0px rgba(0,0,0,0.6)", zIndex: 1}}>
                    <Link style={{height: "14%"}} to={activityNamespace}>
                        <img src={ActivityIcon} style={{width: "33%"}} />
                        <div style={{color: "white"}}>ALL ACTIVITIES</div>
                    </Link>
                    {status === 200 && (
                        <div>
                            <div style={{height: "14%"}}>
                                <img src={ActivityMapIcon} style={{width: "33%"}} />
                                <div style={{color: "white"}}>{activity.title.toUpperCase()} MAP</div>
                            </div>
                            <Link style={{height: "14%"}} to={activityNamespace + "/" + this.props.match.params.id}>
                                <img src={activity.icon} style={{width: "33%"}} />
                                <div style={{color: "white"}}>{activity.title.toUpperCase()} AREAS</div>
                            </Link>
                        </div>
                    )}
                    <div style={{fontSize: "28pt", transform: "rotate(-90deg)", color: "white", height: "86%", display: "flex", justifyContent: "center", alignItems: "center"}}>ACTIVITIES</div>
                </div>
                {status === 200 && (
                    <div style={{width: "86%", height: "100%"}}>
                        
                    </div>
                )}
            </div>
        );
    }
}

const mapStateToProps = ({ activityDestinationList, activityDestinationDetail }) => {
    const { activity } = activityDestinationList;
    const { activityDestination, status, index } = activityDestinationDetail;
    return {
        activity,
        activityDestination,
        index,
        status
    }
}
export default connect(mapStateToProps, actions)(ActivityDestinationDetail);