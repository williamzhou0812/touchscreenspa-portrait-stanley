import React from 'react'
import { connect } from "react-redux";
import Modal from "react-bootstrap-modal";
import { HeavyOrange } from '../Constants';

class AirportInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            infoModal: false
        }
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    openModal() {
        this.setState({ infoModal : true });
    }
    closeModal() {
        this.setState({ infoModal : false });
    }
    styles = {
        horizontalVerticalCenter: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }
    };
    render() {
        const { mainImage, airport } = this.props;
        return (
            <div style={{ width: '100%', height: '100%', display: 'flex', color: 'white'}}>
                <div style={{ backgroundColor: HeavyOrange, width: '14%', boxShadow: '9.899px 0px 7px 0px rgba(0,0,0,0.6)', zIndex: 1, ...this.styles.horizontalVerticalCenter}}>
                    AIRPORT INFO
                </div>
                <div style={{width: "86%"}}>
                    <div style={{height: "42%", backgroundImage: `url(${mainImage})`, backgroundSize: "cover", backgroundPosition: "center"}} />
                    <div style={{height: "18%", ...this.styles.horizontalVerticalCenter, backgroundColor: "rgb(224,172,68)", flexDirection: "column"}}>
                        <div>WELCOME TO</div>
                        <div style={{fontFamily: "The Braggest", fontSize: "30pt"}}>PORT MORESBY AIRPORT</div>
                    </div>
                    <div style={{height: "40%"}}></div>
                </div>
            </div>
        ); 
    }
}

const mapStateToProps = ({ airport : airportInfo }) => {
    const { airport, mainImage, otherImages } = airportInfo;
    return {
        airport,
        mainImage,
        otherImages
    }
}
export default connect(mapStateToProps, null)(AirportInfo);