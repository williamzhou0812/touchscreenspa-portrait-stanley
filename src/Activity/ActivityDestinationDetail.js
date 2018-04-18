import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/activity';
import {
    DECIMAL_RADIX,
    activityNamespace,
    HeavyOrange,
    imageGallery,
    LightBlueButtonBackground,
    MediumOrange,
    ExtraHeavyBlueGreen,
    removeHttp
} from '../Constants';
import { Link } from 'react-router-dom';
import ActivityIcon from '../MainTab/icons/ACTIVITIES_ICON.png';
import ActivityMapIcon from '../Hotel/icons/HotelsMapIcon.png';
import TourList from './TourList';

class ActivityDestinationDetail extends React.Component {
    retrieveData() {
        const id = parseInt(this.props.match.params.id, DECIMAL_RADIX);
        const destid = parseInt(this.props.match.params.destid, DECIMAL_RADIX);
        const { activities } = this.props;
        this.props.fetchActivityDestinationDetail(id, destid, activities);
    }
    componentDidMount() {
        this.retrieveData();
    }
    componentDidUpdate(prevProps) {
        if (prevProps.match.params.destid !== this.props.match.params.destid) {
            this.retrieveData();
        }
    }
    componentWillUnmount() {
        this.props.resetActivityDestinationDetail();
    }
    getPrevLink() {
        const { activity, index, status } = this.props;
        const { activityDestinationActivity: dests } = activity;
        let output = `${activityNamespace}/${this.props.match.params.id}`;
        if (index === 0) {
            return `${output}/${dests[dests.length - 1].id}`;
        } else {
            return `${output}/${dests[index - 1].id}`;
        }
    }
    getNextLink() {
        const { activity, index, status } = this.props;
        const { activityDestinationActivity: dests } = activity;
        let output = `${activityNamespace}/${this.props.match.params.id}`;
        if (index === dests.length - 1) {
            return `${output}/${dests[0].id}`;
        } else {
            return `${output}/${dests[index + 1].id}`;
        }
    }
    renderImages() {
        const {
            imageActivityDestination: images
        } = this.props.activityDestination;
        if (images.length > 1) {
            return imageGallery(images, '100%', '22.68vh');
        } else if (images.length === 1) {
            return (
                <div
                    style={{
                        height: '42%',
                        backgroundImage: `url(${images[0].imageFile})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                />
            );
        } else {
            return (
                <div
                    style={{
                        height: '42%',
                        backgroundColor: HeavyOrange,
                        ...this.styles.horizontalVerticalCenter
                    }}
                >
                    <h1>NO IMAGE FOR THIS ACTIVITY DESTINATION</h1>
                </div>
            );
        }
    }
    renderTours() {
        const {
            tourActivityDestination: tours
        } = this.props.activityDestination;
        if (tours.length > 1) {
            return <TourList data={tours} />;
        } else if (tours.length === 1) {
            const tour = tours[0];
            return (
                <div
                    style={{
                        height: '100%',
                        display: 'flex',
                        backgroundColor: 'rgb(2,61,66)'
                    }}
                >
                    <div
                        style={{
                            flex: 1,
                            ...this.styles.horizontalVerticalCenter
                        }}
                    >
                        {tour.title}
                    </div>
                    {(tour.phone || tour.website) && (
                        <div
                            style={{
                                flex: 1,
                                ...this.styles.horizontalVerticalCenter,
                                flexDirection: 'column'
                            }}
                        >
                            {tour.phone && <div>PH: {tour.phone}</div>}
                            {tour.website && (
                                <div>W: {removeHttp(tour.website)}</div>
                            )}
                        </div>
                    )}
                    {tour.email && (
                        <div
                            style={{
                                flex: 1,
                                ...this.styles.horizontalVerticalCenter
                            }}
                        >
                            E: {tour.email}
                        </div>
                    )}
                </div>
            );
        } else {
            return (
                <div
                    style={{
                        height: '100%',
                        backgroundColor: HeavyOrange,
                        ...this.styles.horizontalVerticalCenter
                    }}
                >
                    <h1>NO TOURS FOR THIS ACTIVITY DESTINATION</h1>
                </div>
            );
        }
    }

    styles = {
        horizontalVerticalCenter: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }
    };

    render() {
        const {
            activity,
            activityDestination: dest,
            index,
            status
        } = this.props;
        const tours =
            dest &&
            dest.tourActivityDestination &&
            dest.tourActivityDestination;
        return (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    color: 'white'
                }}
                className="section--bottom--animation"
            >
                <div
                    style={{
                        backgroundColor: HeavyOrange,
                        width: '14%',
                        boxShadow: '9.899px 0px 7px 0px rgba(0,0,0,0.6)',
                        zIndex: 1
                    }}
                >
                    <Link style={{ height: '14%' }} to={activityNamespace}>
                        <img src={ActivityIcon} style={{ width: '33%' }} />
                        <div style={{ color: 'white' }}>ALL ACTIVITIES</div>
                    </Link>
                    {status === 200 && (
                        <div>
                            <div style={{ height: '14%' }}>
                                <img
                                    src={ActivityMapIcon}
                                    style={{ width: '33%' }}
                                />
                                <div style={{ color: 'white' }}>
                                    {activity.title.toUpperCase()} MAP
                                </div>
                            </div>
                            <Link
                                style={{ height: '14%' }}
                                to={
                                    activityNamespace +
                                    '/' +
                                    this.props.match.params.id
                                }
                            >
                                <img
                                    src={activity.icon}
                                    style={{ width: '33%' }}
                                />
                                <div style={{ color: 'white' }}>
                                    {activity.title.toUpperCase()} AREAS
                                </div>
                            </Link>
                        </div>
                    )}
                    <div
                        style={{
                            fontSize: '28pt',
                            transform: 'rotate(-90deg)',
                            color: 'white',
                            height: '86%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        ACTIVITIES
                    </div>
                </div>
                {status === 200 && (
                    <div style={{ width: '86%', height: '100%' }}>
                        {this.renderImages()}
                        <div style={{ height: '58%' }}>
                            <div
                                style={{
                                    height: '16%',
                                    ...this.styles.horizontalVerticalCenter,
                                    backgroundColor: MediumOrange,
                                    fontSize: '28pt'
                                }}
                            >
                                {activity.title.toUpperCase()}
                            </div>
                            <div style={{ height: '11%', display: 'flex' }}>
                                <Link
                                    style={{
                                        flexBasis: '14%',
                                        ...this.styles.horizontalVerticalCenter,
                                        backgroundColor: 'rgb(101,199,197)',
                                        color: 'white'
                                    }}
                                    to={this.getPrevLink()}
                                >
                                    PREVIOUS LOCATION
                                </Link>
                                <div
                                    style={{
                                        flexBasis: '72%',
                                        backgroundColor: LightBlueButtonBackground,
                                        fontWrap: 'bold',
                                        fontSize: '20pt',
                                        letterSpacing: 5,
                                        ...this.styles.horizontalVerticalCenter
                                    }}
                                >
                                    {dest.title.toUpperCase()}
                                </div>
                                <Link
                                    style={{
                                        flexBasis: '14%',
                                        ...this.styles.horizontalVerticalCenter,
                                        backgroundColor: 'rgb(101,199,197)',
                                        color: 'white'
                                    }}
                                    to={this.getNextLink()}
                                >
                                    NEXT LOCATION
                                </Link>
                            </div>
                            <div
                                style={{
                                    height: tours.length > 2 ? '36%' : '43%',
                                    backgroundColor: ExtraHeavyBlueGreen
                                }}
                            >
                                {dest.description}
                            </div>
                            <div
                                style={{
                                    height: '7%',
                                    backgroundColor: 'rgb(14,154,167)',
                                    ...this.styles.horizontalVerticalCenter,
                                    borderTop: '1px solid rgb(184,223,228)',
                                    borderBottom: '1px solid rgb(184,223,228)'
                                }}
                            >
                                FOR MORE INFORMATION CONTACT:
                            </div>
                            <div
                                style={{
                                    height: tours.length > 2 ? '30%' : '23%'
                                }}
                            >
                                {this.renderTours()}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

const mapStateToProps = ({ activityList, activityDestinationDetail }) => {
    const { activities } = activityList;
    const {
        activity,
        activityDestination,
        status,
        index
    } = activityDestinationDetail;
    return {
        activities,
        activity,
        activityDestination,
        index,
        status
    };
};
export default connect(mapStateToProps, actions)(ActivityDestinationDetail);
