import React from "react";
import { connect } from "react-redux";
import {
    DECIMAL_RADIX,
    accomodationNamespace,
    renderRating
} from "../Constants";
import SubsectionList from "../List/SubsectionList";
import AllAreasIcon from "../Destination/icons/AllAreas.png";
import HotelsMapIcon from "./icons/HotelsMapIcon.png";
class HotelList extends React.Component {
    constructor(props) {
        super(props);
        const id = parseInt(this.props.match.params.id, DECIMAL_RADIX);
        const { accommodations } = this.props;
        const accommodationIndex = accommodations.findIndex(element => {
            return element.id === id;
        });

        this.state = {
            accommodationIndex,
            map: false
        };
    }
    retrieveData() {
        const id = parseInt(this.props.match.params.id, DECIMAL_RADIX);
        const { accommodations } = this.props;
        const accommodationIndex = accommodations.findIndex(element => {
            return element.id === id;
        });
        this.setState({ accommodationIndex });
    }
    componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            this.retrieveData();
        }
    }

    render() {
        const { accommodationIndex } = this.state;
        const { accommodations } = this.props;
        const accommodation = accommodations[accommodationIndex];
        return (
            <SubsectionList
                sideTitle="HOTELS"
                sideButtons={[
                    {
                        title: "ALL AREAS",
                        isLink: true,
                        icon: AllAreasIcon,
                        link: accomodationNamespace
                    },
                    {
                        title: "HOTELS MAP",
                        icon: HotelsMapIcon,
                        isMap: true
                    }
                ]}
                mainTitle={accommodation.title.toUpperCase()}
                data={accommodation.accomodationDestination}
                maps={accommodation.mapHotels}
                imageKey={"logo"}
                isImageArray={false}
                namespace={`${accomodationNamespace}/${accommodation.id}`}
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
                                    letterSpacing: "3px"
                                }}
                            >
                                {renderRating(item.rating, 30)}
                            </div>
                        </div>
                    );
                }}
            />
        );
    }
}

const mapStateToProps = ({ accommodationList }) => {
    const { accommodations } = accommodationList;
    return {
        accommodations
    };
};
export default connect(
    mapStateToProps,
    null
)(HotelList);
