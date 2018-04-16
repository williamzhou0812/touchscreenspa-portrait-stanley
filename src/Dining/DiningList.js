import React from 'react'
import { connect } from "react-redux";
import SubsectionList from "../List/SubsectionList";
import { diningNamespace } from "../Constants";

class DiningList extends React.Component {
    render() {
        const { restaurants } = this.props;
        return (
            <div style={{width: "100%", height: "100%"}}>
                <SubsectionList
                    data={restaurants}
                    sideTitle="DINING"
                    mainTitle="LIST OF RESTAURANTS"
                    imageKey="logo"
                    isImageArray={false}
                    namespace={diningNamespace}
                />
            </div>
        );
    }
}

const mapStateToProps = ({ restaurantList }) => {
    const { restaurants } = restaurantList;
    return {
        restaurants,
    }
}
export default connect(mapStateToProps, null)(DiningList)