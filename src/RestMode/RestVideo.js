import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions/video";
import { shuffle } from "../Constants";
import { isEqual } from "lodash";

class RestVideo extends React.Component {
    constructor(props) {
        super(props);
        this.checkAndResolveIfVideoFreeze = this.checkAndResolveIfVideoFreeze.bind(
            this
        );
    }
    state = {
        prevPlaylist: null,
        playlist: null,
        status: null
    };
    stoppedPlayingInterval = null;
    generatePlaylist() {
        const { videos } = this.props;
        return shuffle(Array.from(videos.keys()));
    }
    componentDidMount() {
        const generatedPlaylist = this.generatePlaylist();
        if (generatedPlaylist) {
            this.setState(
                { prevPlaylist: [], playlist: generatedPlaylist, status: 200 },
                () => {
                    //Every 3 minutes check if video freeze
                    this.stoppedPlayingInterval = setInterval(
                        this.checkAndResolveIfVideoFreeze,
                        180000
                    );
                }
            );
        }
    }
    componentWillUnmount() {
        const { videos } = this.props;
        const { playlist } = this.state;
        this.props.retrieveHandoverVideo(
            videos[playlist[0]].videoFile,
            this.refs.restVideo.currentTime
        );
        window.clearInterval(this.stoppedPlayingInterval);
    }
    onVideoEnded = () => {
        const { playlist } = this.state;
        let newPlaylist = playlist.slice(1); //Combine create new array object and shifting
        if (newPlaylist.length === 0) {
            newPlaylist = this.generatePlaylist();
        }
        this.setState({ status: null }, _ => {
            this.setState({
                prevPlaylist: playlist,
                playlist: newPlaylist,
                status: 200
            });
        });
    };
    checkAndResolveIfVideoFreeze() {
        const { prevPlaylist, playlist } = this.state;
        if (
            Array.isArray(prevPlaylist) &&
            Array.isArray(playlist) &&
            prevPlaylist.length === playlist.length &&
            isEqual(prevPlaylist, playlist)
        ) {
            //Video possibly stuck, try going to next video
            return this.onVideoEnded();
        }
    }

    render() {
        const { videos } = this.props;
        const { status, playlist } = this.state;
        return (
            <div style={{ background: "black", width: "100%", height: "100%" }}>
                {status === 200 && (
                    <video
                        ref="restVideo"
                        src={videos[playlist[0]].videoFile}
                        autoPlay
                        preload="none"
                        onEnded={this.onVideoEnded}
                        style={{ width: "100%" }}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = ({ adVideoList }) => {
    const { videos } = adVideoList;
    return {
        videos
    };
};
export default connect(
    mapStateToProps,
    actions
)(RestVideo);
