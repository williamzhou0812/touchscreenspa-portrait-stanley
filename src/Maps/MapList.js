import React from 'react'
import { connect } from "react-redux";
import SubsectionList from '../List/SubsectionList';

class MapList extends React.Component {
    render() {
        const { maps } = this.props;
        return (
            <SubsectionList
                data={maps}
                imageKey="mapImage"
                isImageArray={false}
                sideButtons={[]}
                sideTitle="MAPS"
                mainTitle="LIST OF MAPS"
                renderText={(item) => {
                    return (
                        <div style={{height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                            {item.title.toUpperCase()}
                            {(item.province && item.id !== 1) && (
                                <div>{item.province}</div>
                            )}
                        </div>
                    );
                }}
                randomise={false}
            />
        );
    }
}

const mapStateToProps = ({ map }) => {
    const { maps } = map;
    return {
        maps
    }
}
export default connect(mapStateToProps, null)(MapList)