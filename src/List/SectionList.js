import React from 'react'
import { Link } from 'react-router-dom';
import DownButton from '../interface/DownButton.png';
import UpButton from '../interface/UpButton.png';
import { SECTION_LIST_ENTRIES, HeavyOrange, LightOrange, shiftArray } from "../Constants";

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
        upArrow: {borderStyle: "none none solid none", borderColor: LightOrange, width: "14vw", display: "flex", justifyContent: "center", alignItems: "center"},
        downArrow: {borderStyle: "solid none none none", borderColor: LightOrange, width: "14vw", display: "flex", justifyContent: "center", alignItems: "center"},
        titleStyle: {fontSize: "28pt", transform: "rotate(-90deg)", color: "white", width: "14vw", display: "flex", justifyContent: "center", alignItems: "center",}
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
            <div style={{width: "100vw", height: "51vh", display: "flex"}}>
                <div style={{backgroundColor: HeavyOrange, width: "14vw", height: "51vh", display: "grid", gridTemplateRows: "15% 70% 15%"}}>
                    <div style={this.styles.upArrow} onClick={this.goUp}>
                        <img src={UpButton} style={{width: "50%"}}/>
                    </div>
                    <div style={this.styles.titleStyle}>{title.toUpperCase()}</div>
                    <div style={this.styles.downArrow} onClick={this.goDown}>
                        <img src={DownButton} style={{width: "50%"}} />
                    </div>
                </div>
                <div style={{width: "86vw", height: "51vh", overflow: "hidden"}}>
                    <div style={{width: "90vw", height: "51vh", overflowY: "auto"}}>
                        <div style={{width: "86vw", height: "51vh", display: "flex", flexDirection: "column"}}>
                            {data.map((item, index) => {
                                return (
                                    <Link 
                                        key={`${item.id}-${index}`} to={`${namespace}/${item.id}`} 
                                        style={{width: "100%", height: "17vh", backgroundImage: `url(${images[index]})`, backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover", display: "flex", justifyContent: "flex-end"}}>
                                            <div style={{width: "100%", height: "24%", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "rgh(64,64,65)", backgroundBlendMode: "darken", color: "white"}}>
                                                {item.title.toUpperCase()}
                                            </div>
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                </div>              
            </div>
        )
    }
}

export default SectionList;