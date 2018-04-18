import React from 'react';
import { Link } from 'react-router-dom';
import DownButton from '../interface/DownButton.png';
import UpButton from '../interface/UpButton.png';
import {
    SECTION_LIST_ENTRIES,
    HeavyOrange,
    LightOrange,
    shiftArray
} from '../Constants';
import PropTypes from 'prop-types';

class SectionList extends React.Component {
    constructor(props) {
        super(props);
        const { data, images } = this.props;
        this.state = {
            data,
            images
        };
        this.goUp = this.goUp.bind(this);
        this.goDown = this.goDown.bind(this);
    }
    styles = {
        upArrow: {
            borderStyle: 'none none solid none',
            borderColor: LightOrange,
            height: '14%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        downArrow: {
            borderStyle: 'solid none none none',
            borderColor: LightOrange,
            height: '14%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        titleStyle: {
            fontSize: '28pt',
            transform: 'rotate(-90deg)',
            color: 'white',
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }
    };
    goUp() {
        const { data, images } = this.state;
        let items = data.slice();
        let imgs = images.slice();
        items = shiftArray(items, 1);
        imgs = shiftArray(imgs, 1);
        this.setState({
            data: items,
            images: imgs
        });
    }
    goDown() {
        const { data, images } = this.state;
        let items = data.slice();
        let imgs = images.slice();
        items = shiftArray(items, -1);
        imgs = shiftArray(imgs, -1);
        this.setState({
            data: items,
            images: imgs
        });
    }
    render() {
        const {
            title,
            namespace,
            linkFunction,
            backgroundPositionValue
        } = this.props;
        const { data, images } = this.state;
        return (
            <div
                style={{ width: '100%', height: '100%', display: 'flex' }}
                className="section--bottom--animation"
            >
                <div
                    style={{
                        backgroundColor: HeavyOrange,
                        width: '14%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        boxShadow: '9.899px 0px 7px 0px rgba(0,0,0,0.6)',
                        zIndex: 1
                    }}
                >
                    <div style={this.styles.upArrow} onClick={this.goUp}>
                        <img src={UpButton} style={{ width: '50%' }} />
                    </div>
                    <div style={this.styles.titleStyle}>
                        {title.toUpperCase()}
                    </div>
                    <div style={this.styles.downArrow} onClick={this.goDown}>
                        <img src={DownButton} style={{ width: '50%' }} />
                    </div>
                </div>
                <div
                    style={{ width: '86%', height: '100%', overflow: 'hidden' }}
                >
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
                                return (
                                    <Link
                                        key={`${item.id}-${index}`}
                                        to={linkFunction(namespace, item)}
                                        style={{
                                            display: 'block',
                                            width: '100%',
                                            height: '33.33333%',
                                            backgroundImage: `url(${
                                                images[index]
                                            })`,
                                            backgroundPosition: backgroundPositionValue,
                                            backgroundRepeat: 'no-repeat',
                                            backgroundSize: 'cover',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'flex-end',
                                            overflowY: 'hidden'
                                        }}
                                    >
                                        <div
                                            style={{
                                                textAlign: 'center',
                                                position: 'relative'
                                            }}
                                        >
                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    width: '100%',
                                                    height: '100%',
                                                    backgroundColor:
                                                        'rgb(64,64,65)',
                                                    mixBlendMode: 'multiply'
                                                }}
                                            />
                                            <div
                                                style={{
                                                    position: 'relative',
                                                    padding: 12,
                                                    color: 'white',
                                                    fontSize: '20pt',
                                                    letterSpacing: '5px'
                                                }}
                                            >
                                                {item.title.toUpperCase()}
                                            </div>
                                        </div>
                                        {/* Parent with position relative, 1st child with position absolute, 2nd child with position relative. This will make the 1st child top, left, 
                                            right, bottom, width and height become "based" / "filled" (since it was set with width and height of 100%) to the parent. 
                                            2nd child, because it was set as position relative, it will become the forefront (aka first layer, since there is no z-ndex) and not be covered
                                            by the mix blend mode
                                            */}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
SectionList.defaultProps = {
    linkFunction: (namespace, item) => {
        return `${namespace}/${item.id}`;
    },
    backgroundPositionValue: 'center'
};
SectionList.propTypes = {
    data: PropTypes.array.isRequired,
    images: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    namespace: PropTypes.string.isRequired
};

export default SectionList;
