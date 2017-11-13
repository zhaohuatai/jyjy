import React, { Component } from 'react';
import { loadAliVedioPlayAuthInfo } from '../../service/alivideo';

class VideoPlay extends Component {

  componentDidMount() {
    loadAliVedioPlayAuthInfo({ vedioId: '909916fdf41044478e57e07682060f58' }).then(data => {

      let player = new Aliplayer({
        id: this.props.id, // 容器id
        vid: '909916fdf41044478e57e07682060f58',
        width: "100%",       // 播放器宽度
        playauth: data.data.aliVedioPalyAuthDto.uploadAuth,

      });

      player.on('ready',function(e) {
        player.play();
        console.log(e);
      });
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
