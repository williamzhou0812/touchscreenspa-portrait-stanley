import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions/video";
import { shuffle } from "../Constants";

class RestVideo extends React.Component {
    state = {
        playlist: null,
        status: null
    };
    generatePlaylist() {
        const { videos } = this.props;
        return shuffle(Array.from(videos.keys()));
    }
    componentDidMount() {
        const generatedPlaylist = this.generatePlaylist();
        if (generatedPlaylist) {
            this.setState({ playlist: generatedPlaylist, status: 200 });
        }
    }
    componentWillUnmount() {
        const { videos } = this.props;
        const { playlist } = this.state;
        this.props.retrieveHandoverVideo(
            videos[playlist[0]].videoFile,
            this.refs.restVideo.currentTime
        );
    }
    onVideoEnded = () => {
        const { playlist } = this.state;
        let newPlaylist = playlist.slice(1); //Combine create new array object and shifting
        if (newPlaylist.length === 0) {
            newPlaylist = this.generatePlaylist();
        }
        this.setState({ status: null }, _ => {
            this.setState({
                playlist: newPlaylist,
                status: 200
            });
        });
    };

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
