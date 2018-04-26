import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CalendarIcon from './icons/CalendarIcon.png';
import {
    eventNamespace,
    accomodationNamespace,
    HeavyOrange,
    LightBlueButtonBackground,
    ExtraHeavyBlueGreen,
    imageGallery,
    DECIMAL_RADIX,
    LightOrange
} from '../Constants';

class EventDetail extends React.Component {
    constructor(props) {
        super(props);

        //Set Initial event index based on URL
        const { events } = this.props;
        const id = parseInt(this.props.match.params.id, DECIMAL_RADIX);
        const currentEventIndex = events.findIndex(item => {
            return item.id === id;
        });

        this.state = {
            currentEventIndex,
            map: false
        };

        //Binding methods
        this.nextEvent = this.nextEvent.bind(this);
        this.prevEvent = this.prevEvent.bind(this);
        this.openMap = this.openMap.bind(this);
        this.closeMap = this.closeMap.bind(this);
    }

    nextEvent() {
        const { events } = this.props;
        const { currentEventIndex } = this.state;
        if (currentEventIndex === events.length - 1) {
            this.setState({
                currentEventIndex: 0
            });
        } else {
            this.setState({
                currentEventIndex: currentEventIndex + 1
            });
        }
    }

    prevEvent() {
        console.log('prevEvent');
        const { events } = this.props;
        const { currentEventIndex } = this.state;
        if (currentEventIndex === 0) {
            this.setState({
                currentEventIndex: events.length - 1
            });
        } else {
            this.setState({
                currentEventIndex: currentEventIndex - 1
            });
        }
    }

    openMap() {
        this.setState({ map: true });
    }

    closeMap() {
        this.setState({ map: false });
    }

    getCurrentEvent() {
        const { events } = this.props;
        const { currentEventIndex } = this.state;
        return events[currentEventIndex];
    }

    renderImages() {
        const event = this.getCurrentEvent();
        const { imageEvent: images } = event;
        if (images.length > 1) {
            return imageGallery(images, '100%', '27vh');
        } else if (images.length === 1) {
            return (
                <div
                    style={{
                        height: '50%',
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
                        height: '50%',
                        backgroundColor: HeavyOrange,
                        ...this.styles.horizontalVerticalCenter
                    }}
                >
                    <h1>NO IMAGE FOR THIS EVENT</h1>
                </div>
            );
        }
    }

    styles = {
        horizontalVerticalCenter: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        nextOrPreviousButtonText: {
            fontSize: '20px',
            letterSpacing: '3px',
            paddingTop: '10px'
        },
        mapOrFindButtonStyle: {
            backgroundColor: LightBlueButtonBackground,
            width: '100%',
            height: '100%',
            marginTop: '5%',
            marginBottom: '5%',
            borderRadius: '5px',
            fontSize: '20px',
            fontWeight: 500,
            boxShadow: '0px 0px 10px 1px rgba(0,0,0,0.5)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        mapOrFindButtonText: {
            paddingTop: '10px',
            letterSpacing: '2px'
        },
        removePaddingMargin: { margin: 0, padding: 0 }
    };

    render() {
        const { events, status } = this.props;
        const event = this.getCurrentEvent();
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
                        zIndex: 1,
                        position: 'relative'
                    }}
                >
                    <Link style={{ height: '14%' }} to={eventNamespace}>
                        <div
                            style={{
                                borderStyle: 'none none solid none',
                                borderColor: LightOrange,
                                paddingBottom: '5px'
                            }}
                        >
                            <img
                                src={CalendarIcon}
                                style={{ width: '33%', paddingTop: '30px' }}
                                alt="Calendar Icon"
                            />
                            <div
                                style={{
                                    color: 'white',
                                    fontSize: '20px',
                                    letterSpacing: '2px'
                                }}
                            >
                                <p style={this.styles.removePaddingMargin}>
                                    CALENDAR
                                </p>
                                <p style={this.styles.removePaddingMargin}>
                                    OF EVENTS
                                </p>
                            </div>
                        </div>
                    </Link>
                    <div
                        style={{
                            color: 'white',
                            height: '86%',
                            fontSize: '40pt',
                            fontWeight: 500,
                            letterSpacing: '10px',
                            ...this.styles.horizontalVerticalCenter
                        }}
                    >
                        <span style={{transform: 'rotate(-90deg)'}}>EVENTS</span>
                    </div>
                </div>
                {status === 200 &&
                    events &&
                    events.length > 0 && (
                        <div style={{ flex: 1 }}>
                            {this.renderImages()}
                            <div style={{ height: '50%' }}>
                                <div style={{ height: '13%', display: 'flex' }}>
                                    <div
                                        style={{
                                            flexBasis: '14%',
                                            ...this.styles
                                                .horizontalVerticalCenter,
                                            backgroundColor: 'rgb(101,199,197)'
                                        }}
                                        onClick={this.prevEvent}
                                    >
                                        <span
                                            style={
                                                this.styles
                                                    .nextOrPreviousButtonText
                                            }
                                        >
                                            PREVIOUS EVENT
                                        </span>
                                    </div>
                                    <div
                                        style={{
                                            flexBasis: '72%',
                                            backgroundColor: LightBlueButtonBackground,
                                            fontWeight: 'bold',
                                            fontWrap: 'bold',
                                            fontSize: '20pt',
                                            letterSpacing: 5,
                                            ...this.styles
                                                .horizontalVerticalCenter
                                        }}
                                    >
                                        <span
                                            style={{
                                                paddingTop: '10px',
                                                fontSize: '40px',
                                                letterSpacing: '3px'
                                            }}
                                        >
                                            {event.title}
                                        </span>
                                    </div>
                                    <div
                                        style={{
                                            flexBasis: '14%',
                                            ...this.styles
                                                .horizontalVerticalCenter,
                                            backgroundColor: 'rgb(101,199,197)'
                                        }}
                                        onClick={this.nextEvent}
                                    >
                                        <span
                                            style={
                                                this.styles
                                                    .nextOrPreviousButtonText
                                            }
                                        >
                                            NEXT EVENT
                                        </span>
                                    </div>
                                </div>
                                <div
                                    style={{
                                        height: '87%',
                                        backgroundColor: ExtraHeavyBlueGreen,
                                        display: 'flex',
                                        paddingLeft: 35
                                    }}
                                >
                                    <div
                                        style={{
                                            flexBasis: '50%',
                                            borderRight:
                                                '1px solid rgb(105,194,209)',
                                            paddingRight: 20
                                        }}
                                    >
                                        <div
                                            style={{
                                                height: '21%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                fontWeight: '500',
                                                fontSize: '20pt',
                                                textAlign: 'left'
                                            }}
                                        >
                                            <span
                                                style={{
                                                    fontSize: '30px',
                                                    letterSpacing: '2px'
                                                }}
                                            >
                                                {event.eventMonth}
                                            </span>
                                        </div>
                                        <div style={{ height: '79%' }}>
                                            <p
                                                style={{
                                                    textAlign: 'left',
                                                    letterSpacing: '2px',
                                                    fontSize: '20px',
                                                    lineHeight: '130%',
                                                    marginTop: 0,
                                                    marginBottom: 0
                                                }}
                                            >
                                                {event.description}
                                            </p>
                                        </div>
                                    </div>
                                    <div
                                        style={{
                                            flexBasis: '50%',
                                            paddingLeft: 20,
                                            paddingRight: 20
                                        }}
                                    >
                                        <div style={{ height: '21%' }} />
                                        <div
                                            style={{
                                                height: '42%',
                                                lineHeight: '150%',
                                                textAlign: 'left',
                                                letterSpacing: '1px',
                                                fontSize: '20px'
                                            }}
                                        >
                                            {event.phone && (
                                                <div>
                                                    CALL TODAY: {event.phone}
                                                </div>
                                            )}
                                            {event.website && (
                                                <div>
                                                    WEBSITE: {event.website}
                                                </div>
                                            )}
                                            {event.email && (
                                                <div>EMAIL: {event.email}</div>
                                            )}
                                            {event.location && (
                                                <div>
                                                    LOCATION: {event.location},
                                                    Papua New Guniea
                                                </div>
                                            )}
                                        </div>
                                        <div
                                            style={{
                                                height: '13%',
                                                ...this.styles
                                                    .horizontalVerticalCenter
                                            }}
                                        >
                                            <div
                                                style={
                                                    this.styles
                                                        .mapOrFindButtonStyle
                                                }
                                            >
                                                <span
                                                    style={
                                                        this.styles
                                                            .mapOrFindButtonText
                                                    }
                                                >
                                                    SHOW ON MAP
                                                </span>
                                            </div>
                                        </div>
                                        <div style={{ height: '5%' }} />
                                        <Link
                                            style={{
                                                height: '13%',
                                                ...this.styles
                                                    .horizontalVerticalCenter
                                            }}
                                            to={
                                                accomodationNamespace +
                                                '/' +
                                                event.destination
                                            }
                                        >
                                            <div
                                                style={
                                                    this.styles
                                                        .mapOrFindButtonStyle
                                                }
                                            >
                                                <span
                                                    style={
                                                        this.styles
                                                            .mapOrFindButtonText
                                                    }
                                                >
                                                    FIND A CLOSE HOTEL
                                                </span>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
            </div>
        );
    }
}

const mapStateToProps = ({ eventList }) => {
    const { events, status } = eventList;
    return {
        events,
        status
    };
};
export default connect(mapStateToProps, null)(EventDetail);
