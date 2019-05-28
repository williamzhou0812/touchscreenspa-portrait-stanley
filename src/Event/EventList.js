import React from "react";
import { connect } from "react-redux";
import SubsectionList from "../List/SubsectionList";
import { eventNamespace, toTitleCase } from "../Constants";

class DestinationList extends React.Component {
    render() {
        const { events } = this.props.eventList;
        return (
            <div
                className="section--bottom--animation"
                style={{ width: "100%", height: "100%" }}
            >
                <SubsectionList
                    data={events}
                    sideTitle="EVENTS"
                    mainTitle="CALENDAR OF EVENTS"
                    imageKey="imageEvent"
                    isImageArray={true}
                    namespace={eventNamespace}
                    renderText={item => {
                        return (
                            <div
                                style={{
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center"
                                }}
                            >
                                <div
                                    style={{
                                        height: "33%",
                                        display: "flex",
                                        alignItems: "flex-end",

                                        paddingLeft: 35,
                                        fontSize: "24px",
                                        letterSpacing: "3px"
                                    }}
                                >
                                    {item.title.toUpperCase()}
                                </div>
                                <div
                                    style={{
                                        height: "33%",
                                        display: "flex",
                                        marginLeft: 35,
                                        fontSize: "24px",
                                        letterSpacing: "1px"
                                    }}
                                >
                                    {toTitleCase(item.eventMonth)}
                                </div>
                            </div>
                        );
                    }}
                    randomise={false}
                />
            </div>
        );
    }
}

const mapStateToProps = ({ eventList }) => {
    return {
        eventList
    };
};

export default connect(mapStateToProps)(DestinationList);
