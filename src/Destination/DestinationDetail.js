import React from 'react'
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
// import { fetchDestinationDetail } from '../actions/destination';
import { fetchDestinationDetail } from '../actions/destination';
import AllAreas from "./icons/AllAreas.png";
import { HeavyOrange, destinationNamespace } from "../Constants";

class DestinationDetail extends React.Component {
    retrieveData() {
        const { destinations } = this.props.destinationList;
        fetchDestinationDetail(this.props.match.params.id, destinations);
    }
    componentDidMount() {
        this.retrieveData();
    }
    componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            this.retrieveData();
        }
    }
    render() {
        const { destination, status } = this.props.destinationDetail;
        return (
            <div style={{width: "100vw", height: "51vh", display: "flex"}}>
                <div style={{backgroundColor: HeavyOrange, width: "14vw", height: "100%"}}>
                    <Link style={{width: "100%", height: "8vh"}} to={destinationNamespace}>
                        <img src={AllAreas} style={{width: "33%"}} />
                        <div>ALL AREAS</div>
                    </Link>
                </div>

                {status === 200 && (
                    <div style={{width: "86vw", height: "100%"}}></div>
                )}
            </div>
        );
    }
}

const mapStateToProps = ({ destinationList, destinationDetail }) => {
    return {
        destinationList,
        destinationDetail
    }
}

export default connect(mapStateToProps, { fetchDestinationDetail })(DestinationDetail);