/**
 * Created by jonathanadhitama on 6/6/17.
 */
import React from 'react';

class ContinueRestVideo extends React.Component {
    videoElement;
    componentDidMount() {
        const { handoverVideo } = this.props;
        this.videoElement.src = handoverVideo;
    }
    componentDidUpdate(prevProps) {
        const { handoverVideo } = this.props;
        if (prevProps.handoverVideo !== handoverVideo) {
            this.videoElement.src = handoverVideo;
        }
    }
    handleCanPlay = () => {
        const { handoverVideoTimestamp } = this.props;
        this.videoElement.currentTime = handoverVideoTimestamp;
    };
    render() {
        const { handleHandoverVideoFinished } = this.props;
        return (
            <div style={{
                height: '100%',
                backgroundColor: 'black'
            }}>
                <video
                    ref={thisVideo => this.videoElement = thisVideo}
                    preload="auto"
                    autoPlay
                    onEnded={handleHandoverVideoFinished}
                    onLoadedMetadata={this.handleCanPlay}
                    style={{width: '100%', height: '100%'}}
                />
            </div>
        );
    }
}

export default ContinueRestVideo;