import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../actions/destination';
import AllAreas from './icons/AllAreas.png';
import {
    HeavyOrange,
    destinationNamespace,
    HeavyBlue,
    MediumBlue,
    LightBlueButtonBackground,
    ExtraHeavyBlueGreen,
    imageGallery,
    LightOrange,
    MediumOrange
} from '../Constants';
import ExportList from './ExploreList';
import ExploreList from './ExploreList';

class DestinationDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            explore: false
        };
        this.goToExplore = this.goToExplore.bind(this);
        this.returnFromExplore = this.returnFromExplore.bind(this);
    }
    retrieveData() {
        const { destinations } = this.props.destinationList;
        this.props.fetchDestinationDetail(
            this.props.match.params.id,
            destinations
        );
    }
    componentDidMount() {
        this.retrieveData();
    }
    componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            this.retrieveData();
        }
    }
    goToExplore() {
        this.setState({ explore: true });
    }
    returnFromExplore() {
        this.setState({ explore: false });
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
            destination,
            exploreData,
            status
        } = this.props.destinationDetail;
        const { explore } = this.state;
        if (explore) {
            return (
                <div
                    style={{ width: '100%', height: '100%', display: 'flex' }}
                    className="section--bottom--animation"
                >
                    <div
                        onClick={this.returnFromExplore}
                        style={{
                            backgroundColor: HeavyOrange,
                            width: '14%',
                            height: '100%',
                            boxShadow: '9.899px 0px 7px 0px rgba(0,0,0,0.6)',
                            zIndex: 1
                        }}
                    >
                        <div style={{ height: '14%' }}>
                            <img src={AllAreas} style={{ width: '33%' }} />
                            <div style={{ color: 'white' }}>
                                BACK TO OVERVIEW
                            </div>
                        </div>
                    </div>
                    {!!destination &&
                        exploreData &&
                        status === 200 && (
                            <div style={{ width: '86%', height: '100%' }}>
                                <div
                                    style={{
                                        height: '8%',
                                        backgroundColor: LightOrange,
                                        color: 'white',
                                        letterSpacing: 5,
                                        ...this.styles.horizontalVerticalCenter,
                                        fontSize: '20pt'
                                    }}
                                >
                                    {destination.title}
                                </div>
                                <div style={{ height: '92%' }}>
                                    <ExploreList data={exploreData} />
                                </div>
                            </div>
                        )}
                </div>
            );
        } else {
            return (
                <div
                    style={{ width: '100%', height: '100%', display: 'flex' }}
                    className="section--bottom--animation"
                >
                    <div
                        style={{
                            backgroundColor: HeavyOrange,
                            width: '14%',
                            height: '100%',
                            boxShadow: '9.899px 0px 7px 0px rgba(0,0,0,0.6)',
                            zIndex: 1
                        }}
                    >
                        <Link
                            style={{ height: '14%' }}
                            to={destinationNamespace}
                        >
                            <img src={AllAreas} style={{ width: '33%' }} />
                            <div style={{ color: 'white' }}>ALL AREAS</div>
                        </Link>
                        <div
                            style={{
                                fontSize: '28pt',
                                transform: 'rotate(-90deg)',
                                color: 'white',
                                height: '86%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                fontSize: '40pt',
                                fontWeight: 500,
                                letterSpacing: '10px'
                            }}
                        >
                            DESTINATIONS
                        </div>
                    </div>

                    {!!destination &&
                        status === 200 && (
                            <div style={{ width: '86%', height: '100%' }}>
                                <div style={{ height: '50%' }}>
                                    {destination.imageDestination.length > 1 ? (
                                        <div>
                                            {imageGallery(
                                                destination.imageDestination,
                                                '100%',
                                                '27vh'
                                            )}
                                        </div>
                                    ) : (
                                        <img
                                            src={
                                                destination.imageDestination[0]
                                                    .imageFile
                                            }
                                            style={{
                                                width: '100%',
                                                height: '100%'
                                            }}
                                        />
                                    )}
                                </div>
                                <div
                                    style={{
                                        height: '50%',
                                        backgroundColor: ExtraHeavyBlueGreen,
                                        paddingLeft: 20,
                                        color: 'white'
                                    }}
                                >
                                    <div
                                        style={{
                                            height: '30%',
                                            letterSpacing: '5px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            fontSize: '28pt'
                                        }}
                                    >
                                        {destination.title}
                                    </div>
                                    <div
                                        style={{
                                            height: '70%',
                                            display: 'flex'
                                        }}
                                    >
                                        <div
                                            style={{
                                                width: '50%',
                                                height: '100%'
                                            }}
                                        >
                                            {destination.description}
                                        </div>
                                        <div
                                            style={{
                                                width: '50%',
                                                height: '100%',
                                                marginLeft: 10
                                            }}
                                        >
                                            <div>
                                                PROVINCE: {destination.province}
                                            </div>
                                            <div>
                                                CLOSEST AIRPORT:{' '}
                                                {destination.airport}
                                            </div>
                                            <div
                                                onClick={this.goToExplore}
                                                style={{
                                                    height: '28%',
                                                    width: '80%',
                                                    backgroundColor: HeavyOrange,
                                                    marginLeft: 10,
                                                    ...this.styles
                                                        .horizontalVerticalCenter
                                                }}
                                            >
                                                EXPLORE
                                            </div>
                                            {destination.mapDestination.length >
                                                0 && (
                                                <div
                                                    style={{
                                                        height: '17%',
                                                        width: '80%',
                                                        marginLeft: 10,
                                                        backgroundColor: LightBlueButtonBackground,
                                                        ...this.styles
                                                            .horizontalVerticalCenter
                                                    }}
                                                >
                                                    {
                                                        destination
                                                            .mapDestination[0]
                                                            .title
                                                    }
                                                </div>
                                            )}
                                            {destination.mapDestination.length >
                                                1 && (
                                                <div
                                                    style={{
                                                        height: '17%',
                                                        width: '80%',
                                                        marginLeft: 10,
                                                        backgroundColor: LightBlueButtonBackground,
                                                        ...this.styles
                                                            .horizontalVerticalCenter
                                                    }}
                                                >
                                                    {
                                                        destination
                                                            .mapDestination[1]
                                                            .title
                                                    }
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                </div>
            );
        }
    }
}

const mapStateToProps = ({ destinationList, destinationDetail }) => {
    return {
        destinationList,
        destinationDetail
    };
};

export default connect(mapStateToProps, actions)(DestinationDetail);
