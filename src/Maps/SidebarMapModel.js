import React from 'react';
import { Modal } from 'react-bootstrap';
import {
    MAX_ZOOM_LEVEL,
    MAP_HEIGHT,
    MAP_WIDTH,
    HeavyOrange,
    LightOrange,
    HOVER_DELAY
} from '../Constants';
import ReactImageMagnify from 'react-image-magnify';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import PropTypes from 'prop-types';

class SidebarMapModel extends React.Component {
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
        const { item, mainTitle, maps } = this.props;
        return (
            <div>
                <div
                    style={{ flexBasis: '14%' }}
                    key={item.index}
                    onClick={this.openModal}
                >
                    <div
                        style={{
                            borderStyle: 'none none solid none',
                            borderColor: LightOrange,
                            paddingBottom: '31px'
                        }}
                    >
                        <img
                            src={item.icon}
                            style={{
                                width: '33%',
                                paddingTop: '33px'
                            }}
                            alt=""
                        />
                        <div
                            style={{
                                color: 'white',
                                fontSize: '16px'
                            }}
                        >
                            {item.title}
                        </div>
                    </div>
                </div>

                <Modal
                    show={showModal}
                    onHide={this.closeModal}
                    dialogClassName="map-modal"
                >
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
                        <div
                            style={{
                                backgroundColor: HeavyOrange,
                                fontSize: '28pt',
                                padding: 20,
                                textAlign: 'center'
                            }}
                        >
                            MAP OF <br /> {mainTitle.toUpperCase()}
                        </div>

                        <div style={{ backgroundColor: LightOrange }}>
                            {maps.length !== 0 ? (
                                <ReactImageMagnify
                                    {...{
                                        smallImage: {
                                            alt: `Hotels Map of ${mainTitle.toUpperCase()}`,
                                            isFluidWidth: true,
                                            src: maps[0].imageFile
                                        },
                                        largeImage: {
                                            src: maps[0].imageFile,
                                            width: MAX_ZOOM_LEVEL * MAP_WIDTH,
                                            height: MAX_ZOOM_LEVEL * MAP_HEIGHT
                                        },
                                        hoverOffDelayInMs: HOVER_DELAY,
                                        enlargedImagePosition: 'over',
                                        isHintEnabled: true,
                                        isActivatedOnTouch: true,
                                        shouldHideHintAfterFirstActivation: false,
                                        hintTextMouse: 'Long-Touch to Zoom'
                                    }}
                                />
                            ) : (
                                <h1
                                    style={{
                                        color: 'white',
                                        textAlign: 'center',
                                        margin: 0,
                                        padding: '20px',
                                        letterSpacing: '2px'
                                    }}
                                >
                                    No Map Available
                                </h1>
                            )}
                        </div>

                        <div
                            style={{
                                backgroundColor: 'rgb(13,109,121)',
                                color: 'rgb(107,193,209)',
                                padding: 5,
                                textAlign: 'center'
                            }}
                        >
                            TAP OUTSIDE OF MAP TO CLOSE
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

SidebarMapModel.propTypes = {
    item: PropTypes.object.isRequired,
    mainTitle: PropTypes.string.isRequired, 
    maps: PropTypes.array.isRequired
}

export default SidebarMapModel;
