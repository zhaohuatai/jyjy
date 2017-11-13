import React, { Component } from 'react';
import { GetVideoPlayAuth } from '../../service/alivideo';

class VideoPlay extends Component {

  componentDidMount() {
    let player = new Aliplayer({
      id: this.props.id, // 容器id
      vid: this.props.vid,
      width: "100%",       // 播放器宽度
      playauth: this.props.PlayAuth,
    });
  }

  render() {
    const { id } = this.props;

    return (
      <div>
        <div  className="prism-player" id={id}>
        </div>
      </div>
    );
  }
}

export default VideoPlay;
