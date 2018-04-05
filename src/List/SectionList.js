import React from 'react'
import { Link } from 'react-router-dom';
import DownButton from '../interface/DownButton.png';
import UpButton from '../interface/UpButton.png';
import { SECTION_LIST_ENTRIES, HeavyOrange, LightOrange } from "../Constants";

class SectionList extends React.Component {
    constructor(props) {
        super(props);
        const { data, images } = this.props;
        this.state = {
            data,
            images
        }
        this.goUp = this.goUp.bind(this);
        this.goDown = this.goDown.bind(this);
    }
    styles = {
        upArrow = {borderStyle: "none none solid none", borderColor: LightOrange, display: "flex", justifyContent: "center", alignItems: "center"},
        downArrow = {borderStyle: "solid none none none", borderColor: LightOrange, display: "flex", justifyContent: "center", alignItems: "center"},
        titleStyle = {fontSize: "28pt", transform: "rotate(-90deg)"}
    };
    goUp() {
        const { data, images } = this.state;
        let items = data.slice();
        let imgs = images.slice();
        items = shiftArray(items, 1);
        imgs = shiftArray(imgs, 1);
        this.setState({
            data: items,
            images: imgs,
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
            images: imgs,
        });
    }
    render() {
        const { title, namespace } = this.props;
        const { data, images } = this.state;
        return (
            <div style={{width: "100%", height: "100%", display: "grid", gridTemplateColumns: "14.4vw 85.6vw"}}>
                <div style={{backgroundColor: HeavyOrange, display: "grid", gridTemplateColumns: "16% 68% 16%"}}>
                    <div style={this.styles.upArrow} onClick={this.goUp}>
                        <img src={UpButton} style={{width: "10%"}} />
                    </div>
                    <div style={this.styles.titleStyle}>{title.toUpperCase()}</div>
                    <div style={this.styles.downArrow} onClick={this.goDown}>
                        <img src={DownButton} style={{width: "10%"}} />
                    </div>
                </div>
                <div style={{width: "85.6vw", height: "100%", overflow: "hidden"}}>
                    <div style={{width: "90vw", height: "100%", overflowY: "auto"}}>
                        <div style={{width: "85.6vw", height: "100%", display: "grid", gridTemplateRows: `repeat(${SECTION_LIST_ENTRIES}, 1fr)`, gridTemplateColumns: "100%"}}>
                            {data.map((item, index) => {
                                <Link 
                                    key={`${item.id}-${index}`} to={`${namespace}/${item.id}`} 
                                    style={{width: "100%", height: "100%", backgroundImage: `url(${images[index]}) no-repeat`, display: "flex", alignItems: "center"}}>
                                        <div style={{width: "100%", height: "24%", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "rgh(64,64,65)", backgroundBlendMode: "darken"}}>
                                            {item.title.toUpperCase()}
                                        </div>
                                </Link>
                            })}
                        </div>
                    </div>
                </div>              
            </div>
        )
    }
}

export default SectionList;