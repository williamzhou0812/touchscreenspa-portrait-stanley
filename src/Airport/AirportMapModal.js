import React from 'react';
import { Modal } from 'react-bootstrap';
import { MAX_ZOOM_LEVEL, MAP_HEIGHT, MAP_WIDTH } from '../Constants';
import { ReactImageMagnifyTouch } from 'react-image-magnify';
import AirportMap from "../Maps/PortMoresbyAirportMap.png";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CloseIcon from 'material-ui/svg-icons/navigation/close';

class AirportMapModal extends React.Component {
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
    render() {
        const { showModal } = this.state;
        return (
            <div>
                <div style={{
                    width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", borderStyle: 'solid solid solid none',
                    borderWidth: '1px', borderColor: 'rgb(104,199,197)', backgroundColor: 'rgb(13,109,121)', color: 'white'}} onClick={this.openModal}
                >
                    AIRPORT MAP
                </div>
                <Modal show={showModal} onHide={this.closeModal} dialogClassName="map-modal">
                    <Modal.Body>
                        <div style={{ position: 'absolute', right: 0, top: 0 }}>
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
                        <div style={{backgroundColor: "rgb(25,150,162)", fontSize: "28pt", padding: 20, textAlign: "center" }}>MAP OF<br/>PORT MORESBY AIRPORT</div>
                        <ReactImageMagnifyTouch
                            largeImage={{
                                src: AirportMap,
                                width: MAX_ZOOM_LEVEL * MAP_WIDTH,
                                height: MAX_ZOOM_LEVEL * MAP_HEIGHT
                            }}
                            smallImage={{
                                src: AirportMap,
                                width: MAP_WIDTH,
                                height: MAP_HEIGHT
                            }}
                            isActivatedOnTouch={true}
                        />
                        <div style={{backgroundColor: "rgb(13,109,121)", color: "rgb(107,193,209)", padding: 5, textAlign: "center"}}>TAP OUTSIDE OF MAP TO CLOSE</div>
                    </Modal.Body>
                </Modal>
            </div>
        );
        
    }
}

export default AirportMapModal;