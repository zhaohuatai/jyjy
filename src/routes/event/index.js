import React, { Component } from 'react';
import { loadPubCustomize } from '../../service/customize';
import { loadWXConfig } from '../../service/user';
import { API_DOMAIN } from '../../utils/config';
import WXshare from '../../utils/WXshare';

class Event extends Component {
  state = {
    pubCustomize: {
      "content":"",
      "id":3,
      "isEnabled":"",
      "key":"EVENT",
      "recordTime":1510736638131,
      "status":""
    }
  }

  componentDidMount() {
    loadPubCustomize({ key: 'EVENT' }).then(data => {
      this.setState({pubCustomize: data.data.pubCustomize})
    });

    WXshare({
      title: '经英教育-大事计', // 分享标题
      link: `${API_DOMAIN}#/event`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: `${API_DOMAIN}static/WechatIMG290.png`, // 分享图标
    });
  }

  render() {
    return (
      <div dangerouslySetInnerHTML={{ __html: this.state.pubCustomize.content }} style={{ backgroundColor: '#fff', padding: '15px' }} />
    );
  }
}

export default Event;
