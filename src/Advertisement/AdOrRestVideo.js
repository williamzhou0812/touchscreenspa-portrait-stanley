/**
 * Created by jonathanadhitama on 6/6/17.
 */
import React from 'react';
import AdVideo from './AdVideo';
import ContinueRestVideo from './ContinueRestVideo';
import { connect } from 'react-redux';
import * as actions from '../actions';

class AdOrRestVideo extends React.Component {
    render() {
        if (this.props.handoverVideoData.videoSrc) {
            return (
                <ContinueRestVideo
                    handoverVideo={this.props.handoverVideoData.videoSrc}
                    handoverVideoTimestamp={
                        this.props.handoverVideoData.timestamp
                    }
                    handleHandoverVideoFinished={this.props.resetAdVideo}
                />
            );
        } else {
            return <AdVideo />;
        }
    }
}

//export default AdOrRestVideo;
function mapStateToProps({ handoverVideoData }) {
    return { handoverVideoData };
}

export default connect(mapStateToProps, actions)(AdOrRestVideo);
