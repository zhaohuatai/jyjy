import React, { Component } from 'react';
import { loadAliVedioPlayAuthInfo } from '../../service/alivideo';

class VideoPlay extends Component {

  constructor(props){
    super(props);
    this.player = {};
  }

  componentDidMount() {
    const { id, vid, playauth} = this.props;

    console.log(this.props);

    this.player = new Aliplayer({
      id, // 容器id
      vid,
      width: "100%",       // 播放器宽度
      playauth,
    });
  }


  render() {
    const { id } = this.props;

    return (
      <div>
        <div  className="prism-player" id={id}></div>
      </div>
    );
  }
}

export default VideoPlay;
