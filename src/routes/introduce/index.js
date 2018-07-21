import React, { Component } from 'react';
import { loadPubCustomize } from '../../service/customize';
import WXshare from '../../utils/WXshare';
import { API_DOMAIN } from '../../utils/config';

class Introduce extends Component {
  state = {
    pubCustomize: {
      "content":"",
      "id":3,
      "isEnabled":"",
      "key":"INTRODUCE",
      "recordTime":1510736638131,
      "status":""
    }
  }

  componentDidMount() {
    loadPubCustomize({ key: 'INTRODUCE' }).then(data => {
      this.setState({pubCustomize: data.data.pubCustomize})
    })

    WXshare({
      title: '经英教育-经英简介',
      link: `${API_DOMAIN}?redirect_url=introduce`,
      imgUrl: `${API_DOMAIN}static/WechatIMG290.png`,
    });
  }

  render() {
    return (
      <div dangerouslySetInnerHTML={{ __html: this.state.pubCustomize.content }} style={{ backgroundColor: '#fff', padding: '15px', overflow: 'hidden' }} />
    );
  }
}

export default Introduce;
