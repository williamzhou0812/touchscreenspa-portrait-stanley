import React from 'react';
import { connect } from 'react-redux';
import {
    getRandomImage,
    getHeaderImagesNoMap,
    accomodationNamespace,
    destinationNamespace
} from '../Constants';
import SectionList from '../List/SectionList';

class DestinationList extends React.Component {
    renderDestinationList() {
        const pathname = this.props.location.pathname;
        if (pathname.includes(accomodationNamespace)) {
            return (
                <SectionList
                    data={this.props.accommodationList.accommodations}
                    images={this.props.accommodationList.images}
                    title="HOTELS"
                    namespace={accomodationNamespace}
                />
            );
        } else {
            return (
                <SectionList
                    data={this.props.destinationList.destinations}
                    images={this.props.destinationList.images}
                    title="DESTINATIONS"
                    namespace={destinationNamespace}
                />
            );
        }
    }
    render() {
        return (
            <div
                className="section--bottom--animation"
                style={{ width: '100%', height: '100%' }}
            >
                {this.renderDestinationList()}
            </div>
        );
    }
}

const mapStateToProps = ({ destinationList, accommodationList }) => {
    return {
        destinationList,
        accommodationList
    };
};

export default connect(mapStateToProps)(DestinationList);
