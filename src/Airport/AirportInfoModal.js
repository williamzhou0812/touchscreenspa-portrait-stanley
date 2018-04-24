import React from 'react';
import { connect } from "react-redux";
import { imageGallery, HeavyOrange } from "../Constants";
import { Modal } from "react-bootstrap";
import nl2br from "react-nl2br";

class AirportInfoModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        }
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    openModal() {
        this.setState({ showModal : true });
    }
    closeModal() {
        this.setState({ showModal : false });
    }
    renderImages() {
        const { otherImages } = this.props;
        if (otherImages.length > 1) {
            return imageGallery(otherImages, "100%", "15vh")
        } else if (otherImages.length === 1) {
            return <div style={{height: "29%", backgroundImage: `url(${otherImages[0].imageFile})`, backgroundSize: "cover", backgroundPosition: "center"}} />
        } else {
            return (
                <div style={{height: "29%", backgroundColor: HeavyOrange, display: "flex", justifyContent: "center", alignItems: "center"}}>
                    NO IMAGE FOR AIRPORT INFORMATION
                </div>
            );
        }
    }
    render() {
        const { description } = this.props;
        const { showModal } = this.state;
        return(
            <div>
                <div onClick={this.openModal}>AIRPORT INFORMATION</div>
                <Modal
                    show={showModal}
                    onHide={this.closeModal}
                    bsSize="large"
                >
                    <Modal.Header closeButton>
                        {this.renderImages()}
                        <Modal.Title>Airport Information</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{nl2br(description)}</Modal.Body>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = ({ airport : airportDetail }) => {
    const  { airport, otherImages } = airportDetail;
    const { description } = airport;
    return {
        otherImages,
        description
    }
}
export default connect(mapStateToProps, null)(AirportInfoModal);
