import React from 'react';
import { Modal } from 'react-bootstrap';
import { MAX_ZOOM_LEVEL, MAP_HEIGHT, MAP_WIDTH, HeavyOrange } from '../Constants';
import ReactImageMagnify from 'react-image-magnify';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import PropTypes from 'prop-types';

class MapModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        }
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
        const { rootStyle, title, buttonTitle, mapImage, buttonStyle, textStyle } = this.props;
        const { showModal } = this.state;
        return(
            <div style={rootStyle}>
                <div style={buttonStyle} onClick={this.openModal}>
                    <span style={textStyle}>{!!buttonTitle ? buttonTitle.toUpperCase() : title.toUpperCase()}</span>
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
                        <div style={{backgroundColor: HeavyOrange, fontSize: "28pt", padding: 20, textAlign: "center" }}>MAP OF<br/>{title.toUpperCase()}</div>
                        <ReactImageMagnify {...{
                            smallImage: {
                                alt: `Map of ${title}`,
                                isFluidWidth: true,
                                src: mapImage
                            },
                            largeImage: {
                                src: mapImage,
                                width: MAX_ZOOM_LEVEL * MAP_WIDTH,
                                height: MAX_ZOOM_LEVEL * MAP_HEIGHT
                            },
                            enlargedImagePosition: 'over',
                            isHintEnabled: true,
                            isActivatedOnTouch: true,
                            shouldHideHintAfterFirstActivation: false,
                            hintTextMouse: "Long-Touch to Zoom"
                        }} />
                        <div style={{backgroundColor: "rgb(13,109,121)", color: "rgb(107,193,209)", padding: 5, textAlign: "center"}}>TAP OUTSIDE OF MAP TO CLOSE</div>
                    </Modal.Body>
                </Modal>
            </div>
            
        );
    }
}

MapModal.defaultProps = {
    buttonTitle: null,
    rootStyle: {width: "100%", height: "100%"}
}

MapModal.propTypes = {
    rootStyle: PropTypes.object,
    buttonTitle: PropTypes.string,
    title: PropTypes.string.isRequired,
    buttonStyle: PropTypes.object.isRequired,
    textStyle: PropTypes.object.isRequired,
    mapImage: PropTypes.string.isRequired
};

export default MapModal;