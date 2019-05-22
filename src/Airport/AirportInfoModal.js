import React from "react";
import { connect } from "react-redux";
import {
    imageGallery,
    HeavyOrange,
    LightBlueButtonBackground
} from "../Constants";
import { Modal } from "react-bootstrap";
// import nl2br from "react-nl2br";
import "./airportmodal.css";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import CloseIcon from "material-ui/svg-icons/navigation/close";
import Markdown from "../Markdown";

class AirportInfoModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    openModal() {
        this.setState({ showModal: true });
    }
    closeModal() {
        this.setState({ showModal: false });
    }
    renderImages() {
        const { otherImages } = this.props;
        if (otherImages.length > 1) {
            return imageGallery(otherImages, "100%", "280px");
        } else if (otherImages.length === 1) {
            return (
                <div
                    style={{
                        height: "280px",
                        backgroundImage: `url(${otherImages[0].imageFile})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center"
                    }}
                />
            );
        } else {
            return (
                <div
                    style={{
                        height: "280px",
                        backgroundColor: HeavyOrange,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    NO IMAGE FOR AIRPORT INFORMATION
                </div>
            );
        }
    }
    render() {
        const { description } = this.props;
        const { showModal } = this.state;
        return (
            <div>
                <div
                    onClick={this.openModal}
                    style={{
                        height: "70px",
                        width: "100%",
                        backgroundColor: LightBlueButtonBackground,
                        borderRadius: "5px",
                        fontSize: "24px",
                        fontWeight: 600,
                        boxShadow: "0px 0px 10px 1px rgba(0,0,0,0.5)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        paddingTop: "5px",
                        letterSpacing: "3px"
                    }}
                >
                    AIRPORT INFORMATION
                </div>
                <Modal show={showModal} onHide={this.closeModal}>
                    <Modal.Body>
                        <div style={{ position: "absolute", right: 0, top: 0 }}>
                            <MuiThemeProvider>
                                <CloseIcon
                                    onClick={this.closeModal}
                                    color="white"
                                    style={{
                                        padding: 0,
                                        height: 32,
                                        width: 32
                                    }}
                                />
                            </MuiThemeProvider>
                        </div>
                        {this.renderImages()}
                        <div
                            style={{
                                height: "88px",
                                backgroundColor: "rgb(13,109,121)",
                                letterSpacing: 5,
                                fontSize: "30pt",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
                            AIRPORT INFORMATION
                        </div>
                        <div
                            style={{
                                backgroundColor: "rgb(25,150,162)",
                                padding: 20,
                                fontSize: "16px",
                                letterSpacing: "1px"
                            }}
                        >
                            {/* {nl2br(description)} */}
                            <Markdown source={description} />
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = ({ airport: airportDetail }) => {
    const { airport, otherImages } = airportDetail;
    const { description } = airport;
    return {
        otherImages,
        description
    };
};
export default connect(
    mapStateToProps,
    null
)(AirportInfoModal);
