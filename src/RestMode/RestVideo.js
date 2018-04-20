import React from 'react';
import { connect } from "react-redux";
import * as actions from "../actions/video";
import { shuffle } from "../Constants";

class RestVideo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            videos: null,
            status: null
        }
    }
    generatePlaylist() {
        const { videos } = this.props;
        let playlist = [];
        videos.forEach((_, index) => {
            playlist = [...playlist, index];
            playlist = shuffle(playlist);
        });
        return shuffle(playlist);
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
        this.props.retrieveHandoverVideo(videos[playlist[0]].videoFile, this.refs.restVideo.currentTime);
    }
    render() {
        const { videos } = this.props;
        const { status, playlist } = this.state;
        return (
            <div style={{background: 'black', width: '100%', height: '100%'}}>
                {status === 200 && (
                    <video ref="restVideo" src={videos[playlist[0]].videoFile} autoPlay preload="none"
                        onEnded={() => {
                            let newPlaylist = playlist.slice(1); //Combine create new array object and shifting
                            if (newPlaylist.length === 0) {
                                newPlaylist = this.generatePlaylist();
                                newPlaylist = shuffle(newPlaylist);
                            }
                            this.setState({ status: null }, _ => {
                                this.setState({
                                    playlist: newPlaylist,
                                    status: 200
                                });
                            });
                        }}
                        style={{ width: '100%' }}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = ({ adVideoList }) => {
    const { videos, status } = adVideoList;
    return {
        videos,
        status
    }
}
export default connect(mapStateToProps, actions)(RestVideo);