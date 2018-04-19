/**
 * Created by jonathanadhitama on 6/6/17.
 */
import React from 'react';
import { shuffle } from '../Constants';
import { connect } from 'react-redux';
import * as actions from '../actions';

class AdVideo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playlist: null,
            status: null
        }
    }
    componentDidMount() {
        const generatedPlaylist = this.generatePlaylist();
        if (generatedPlaylist) {
            this.setState({ playlist: generatedPlaylist, status: 200 });
        }
    }
    generatePlaylist() {
        const { videos } = this.props.adVideoList;
        let playlist = [];
        videos.forEach((_, index) => {
            playlist = [...playlist, index];
        });
        return shuffle(playlist);
    }
    render() {
        const { status, playlist } = this.state;
        const {videos} = this.props.adVideoList;
        return (
            <div style={{
                height: '100%',
                backgroundColor: 'black'
            }}>
                {status === 200 &&
                    <video
                        src={videos[playlist[0]].videoFile}
                        autoPlay preload="none"
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
                        style={{width: '100%', height: '100%'}}
                    />
                }
            </div>
        );
    }
}
function mapStateToProps({ adVideoList }) {
    return { adVideoList };
}

export default connect(mapStateToProps, actions)(AdVideo);