import React from 'react';
import { connect } from 'react-redux';
import UpButton from '../Destination/icons/UpExploreButton.png';
import DownButton from '../Destination/icons/DownExploreButton.png';
import {
    SUBSECTION_LIST_ENTRIES,
    MediumOrange,
    shiftArray,
    HeavyBlue,
    HeavyOrange,
    LightOrange,
    LightBlue,
    MAX_ZOOM_LEVEL,
    MAP_HEIGHT,
    MAP_WIDTH
} from '../Constants';
import { Modal } from 'react-bootstrap';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import ReactImageMagnify from 'react-image-magnify';

class MapList extends React.Component {
    constructor(props) {
        super(props);
        const { maps } = this.props;
        let data = maps.slice();
        data.forEach(d => {
            d.map = false;
        });
        this.state = {
            data
        };
        this.goUp = this.goUp.bind(this);
        this.goDown = this.goDown.bind(this);
    }
    goUp() {
        let items = this.state.data.slice();
        items = shiftArray(items, 1);
        this.setState({
            data: items
        });
    }
    goDown() {
        let items = this.state.data.slice();
        items = shiftArray(items, -1);
        this.setState({
            data: items
        });
    }
    openMap(index) {
        this.setState({
            data: [
                ...this.state.data.slice(0, index),
                { ...this.state.data[index], map: true },
                ...this.state.data.slice(index + 1)
            ]
        });
    }
    closeMap(index) {
        this.setState({
            data: [
                ...this.state.data.slice(0, index),
                { ...this.state.data[index], map: false },
                ...this.state.data.slice(index + 1)
            ]
        });
    }
    styles = {
        horizontalVerticalCenter: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }
    };
    render() {
        const { data } = this.state;
        const itemHeight = `${100 / SUBSECTION_LIST_ENTRIES}%`;
        return (
            <div
                className="section--bottom--animation"
                style={{ width: '100%', height: '100%', display: 'flex' }}
            >
                <div
                    style={{
                        backgroundColor: HeavyOrange,
                        width: '14%',
                        boxShadow: '9.899px 0px 7px 0px rgba(0,0,0,0.6)',
                        zIndex: 1,
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <div
                        style={{
                            flex: 1,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            color: 'white',
                            fontSize: '40pt',
                            fontWeight: 500,
                            letterSpacing: '10px'
                        }}
                    >
                        <span style={{ transform: 'rotate(-90deg)' }}>
                            MAPS
                        </span>
                    </div>
                </div>
                <div style={{ width: '86%' }}>
                    <div
                        style={{
                            height: '8%',
                            backgroundColor: LightOrange,
                            color: 'white',
                            ...this.styles.horizontalVerticalCenter,
                            fontSize: '20pt',
                            letterSpacing: 5
                        }}
                    >
                        LIST OF MAPS
                    </div>
                    <div
                        style={{
                            height: '6%',
                            backgroundColor: MediumOrange,
                            ...this.styles.horizontalVerticalCenter
                        }}
                        onClick={this.goUp}
                    >
                        <img src={UpButton} style={{ width: '5%' }} alt="Up" />
                    </div>
                    <div style={{ height: '80%', overflow: 'hidden' }}>
                        <div
                            style={{
                                height: '100%',
                                overflowY: 'auto',
                                marginRight: '-30px'
                            }}
                        >
                            <div
                                style={{
                                    height: '100%',
                                    overflow: 'auto',
                                    paddingRight: '30px'
                                }}
                            >
                                {data.map((item, index) => {
                                    const isLastItem =
                                        index === data.length - 1;
                                    return (
                                        <div
                                            style={{ height: itemHeight }}
                                            key={`${item.id}-${index}`}
                                        >
                                            <div
                                                style={{
                                                    height: '100%',
                                                    color: 'white',
                                                    display: 'flex'
                                                }}
                                                onClick={() =>
                                                    this.openMap(index)
                                                }
                                            >
                                                <div
                                                    style={{
                                                        width: '33%',
                                                        backgroundImage: `url(${
                                                            item.mapImage
                                                        })`,
                                                        backgroundSize: 'cover',
                                                        backgroundPosition:
                                                            'center',
                                                        borderBottom: isLastItem
                                                            ? 'none'
                                                            : `1px solid ${LightBlue}`
                                                    }}
                                                />
                                                <div
                                                    style={{
                                                        width: '67%',
                                                        backgroundColor: HeavyBlue,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        paddingLeft: 35,
                                                        fontSize: '24px',
                                                        letterSpacing: '3px',
                                                        borderBottom: isLastItem
                                                            ? 'none'
                                                            : '1px solid rgb(183,223,228)'
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            height: '100%',
                                                            display: 'flex',
                                                            flexDirection:
                                                                'column',
                                                            justifyContent:
                                                                'center',
                                                            alignItems: 'center'
                                                        }}
                                                    >
                                                        {item.title.toUpperCase()}
                                                        {item.province &&
                                                            item.id !== 1 && (
                                                                <div>
                                                                    {
                                                                        item.province
                                                                    }
                                                                </div>
                                                            )}
                                                    </div>
                                                </div>
                                            </div>
                                            <Modal
                                                show={data[index].map}
                                                onHide={() =>
                                                    this.closeMap(index)
                                                }
                                                dialogClassName="map-modal"
                                            >
                                                <Modal.Body>
                                                    <div
                                                        style={{
                                                            position:
                                                                'absolute',
                                                            right: 0,
                                                            top: 0
                                                        }}
                                                    >
                                                        <MuiThemeProvider>
                                                            <CloseIcon
                                                                onClick={() =>
                                                                    this.closeMap(
                                                                        index
                                                                    )
                                                                }
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
                                                        MAP OF<br />
                                                        {item.title.toUpperCase()}
                                                    </div>
                                                    <ReactImageMagnify
                                                        {...{
                                                            smallImage: {
                                                                alt: `Map of ${item.title.toUpperCase()}`,
                                                                isFluidWidth: true,
                                                                src:
                                                                    item.mapImage
                                                            },
                                                            largeImage: {
                                                                src:
                                                                    item.mapImage,
                                                                width:
                                                                    MAX_ZOOM_LEVEL *
                                                                    MAP_WIDTH,
                                                                height:
                                                                    MAX_ZOOM_LEVEL *
                                                                    MAP_HEIGHT
                                                            },
                                                            enlargedImagePosition:
                                                                'over',
                                                            isHintEnabled: true,
                                                            isActivatedOnTouch: true,
                                                            shouldHideHintAfterFirstActivation: false,
                                                            hintTextMouse:
                                                                'Long-Touch to Zoom'
                                                        }}
                                                    />
                                                    <div
                                                        style={{
                                                            backgroundColor:
                                                                'rgb(13,109,121)',
                                                            color:
                                                                'rgb(107,193,209)',
                                                            padding: 5,
                                                            textAlign: 'center'
                                                        }}
                                                    >
                                                        TAP OUTSIDE OF MAP TO
                                                        CLOSE
                                                    </div>
                                                </Modal.Body>
                                            </Modal>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    <div
                        style={{
                            height: '6%',
                            backgroundColor: MediumOrange,
                            ...this.styles.horizontalVerticalCenter
                        }}
                        onClick={this.goDown}
                    >
                        <img
                            src={DownButton}
                            style={{ width: '5%' }}
                            alt="Down"
                        />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ map }) => {
    const { maps } = map;
    return {
        maps
    };
};
export default connect(mapStateToProps, null)(MapList);
