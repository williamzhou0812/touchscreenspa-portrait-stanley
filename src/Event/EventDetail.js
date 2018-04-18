import React from 'react'
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import CalendarIcon from "./icons/CalendarIcon.png";
import { eventNamespace, accomodationNamespace, HeavyOrange, LightBlueButtonBackground, ExtraHeavyBlueGreen, imageGallery, DECIMAL_RADIX } from "../Constants";

class EventDetail extends React.Component {
    constructor(props) {
        super(props);
        
        //Set Initial event index based on URL
        const { events } = this.props;
        const id = parseInt(this.props.match.params.id, DECIMAL_RADIX);
        const currentEventIndex = events.findIndex((item) => {
            return item.id === id;
        });

        this.state = {
            currentEventIndex,
            map: false,
        }

        //Binding methods
        this.nextEvent = this.nextEvent.bind(this);
        this.prevEvent = this.prevEvent.bind(this);
        this.openMap = this.openMap.bind(this);
        this.closeMap = this.closeMap.bind(this);
    }

    nextEvent() {
        const { events } = this.props;
        const { currentEventIndex } = this.state;
        if (currentEventIndex === (events.length - 1)) {
            this.setState({
                currentEventIndex: 0
            })
        } else {
            this.setState({
                currentEventIndex: currentEventIndex + 1
            })
        }
    }

    prevEvent() {
        const { events } = this.props;
        const { currentEventIndex } = this.state;
        if (currentEventIndex === 0) {
            this.setState({
                currentEventIndex: events.length - 1
            })
        } else {
            this.setState({
                currentEventIndex: currentEventIndex - 1
            })
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
        const { imageEvent : images } = event;
        if (images.length > 1) {
            return imageGallery(images, "100%", "27vh");
        } else if (images.length === 1) {
            return <div style={{height: "50%", backgroundImage: `url(${images[0].imageFile})`, backgroundSize: 'cover', backgroundPosition: 'center'}} />;
        } else {
            return (
                <div style={{height: "50%", backgroundColor: HeavyOrange, ...this.styles.horizontalVerticalCenter}}>
                    <h1>NO IMAGE FOR THIS EVENT</h1>
                </div>)
            ;
        }
    }

    styles = {
        horizontalVerticalCenter: {display: "flex", alignItems: "center", justifyContent: "center"}
    }

    render() {
        const { events, status } = this.props;
        const event = this.getCurrentEvent();
        return (
            <div style={{width: "100%", height: "100%", display: "flex", color: "white"}}>
                <div style={{backgroundColor: HeavyOrange, width: "14%", boxShadow: "9.899px 0px 7px 0px rgba(0,0,0,0.6)", zIndex: 1}}>
                    <Link style={{height: "14%"}} to={eventNamespace}>
                        <img src={CalendarIcon} style={{width: "33%"}} />
                        <div style={{color: "white"}}>CALENDAR OF EVENTS</div>
                    </Link>
                    <div style={{fontSize: "28pt", transform: "rotate(-90deg)", color: "white", height: "86%", display: "flex", justifyContent: "center", alignItems: "center"}}>EVENTS</div>
                </div>
                {(status === 200 && events && events.length > 0) && (
                    <div style={{flex: 1}}>
                        {this.renderImages()}
                        <div style={{height: "50%"}}>
                            <div style={{height: "13%", display: "flex"}}>
                                <div style={{flexBasis: "14%", ...this.styles.horizontalVerticalCenter, backgroundColor: "rgb(101,199,197)"}} onClick={this.prevEvent}>PREVIOUS EVENT</div>
                                <div style={{
                                    flexBasis: "72%", backgroundColor: LightBlueButtonBackground, fontWeight: "bold", fontWrap: "bold", fontSize: "20pt", letterSpacing: 5, 
                                    ...this.styles.horizontalVerticalCenter
                                }}>
                                    {event.title}
                                </div>
                                <div style={{flexBasis: "14%", ...this.styles.horizontalVerticalCenter, backgroundColor: "rgb(101,199,197)"}} onClick={this.nextEvent}>NEXT EVENT</div>
                            </div>
                            <div style={{height: "87%", backgroundColor: ExtraHeavyBlueGreen, display: "flex", paddingLeft: 20}}>
                                <div style={{flexBasis: "50%", borderRight: "1px solid rgb(105,194,209)", paddingRight: 20}}>
                                    <div style={{height: "21%", display: "flex", alignItems: "center", fontWeight: "bold", fontSize: "20pt"}}>
                                        {event.eventMonth}
                                    </div>
                                    <div style={{height: "79%"}}>{event.description}</div>
                                </div>
                                <div style={{flexBasis: "50%", paddingLeft: 20, paddingRight: 20}}>
                                    <div style={{height: "21%"}} />
                                    <div style={{height: "42%"}}>
                                        {event.phone && <div>CALL TODAY: {event.phone}</div>}
                                        {event.website && <div>WEBSITE: {event.website}</div>}
                                        {event.email && <div>EMAIL: {event.email}</div>}
                                        {event.location && <div>LOCATION: {event.location}, Papua New Guniea</div>}
                                    </div>
                                    <div style={{height: "15%", ...this.styles.horizontalVerticalCenter}}>SHOW ON MAP</div>
                                    <div style={{height: "5%"}} />
                                    <Link style={{height: "15%", ...this.styles.horizontalVerticalCenter}} to={accomodationNamespace + "/" + event.destination}>FIND A CLOSE HOTEL</Link>
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
    }
};
export default connect(mapStateToProps, null)(EventDetail);
