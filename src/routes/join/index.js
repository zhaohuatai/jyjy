import React, { Component } from 'react';
import { loadPubCustomize } from '../../service/customize';
import WXshare from '../../utils/WXshare';
import { API_DOMAIN } from '../../utils/config';

class Join extends Component {
  state = {
    pubCustomize: {
      "content":"",
      "id":3,
      "isEnabled":"",
      "key":"JOIN_COMMUNITY",
      "recordTime":1510736638131,
      "status":""
    }
  }

  componentDidMount() {
    loadPubCustomize({ key: 'JOIN_COMMUNITY' }).then(data => {
      this.setState({pubCustomize: data.data.pubCustomize})
    })

    WXshare({
      title: '经英教育-加入我们', // 分享标题
      link: `${API_DOMAIN}#/join`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: `${API_DOMAIN}static/WechatIMG290.png`, // 分享图标
    });
  }


  render() {
    return (
      <div dangerouslySetInnerHTML={{ __html: this.state.pubCustomize.content }} style={{ backgroundColor: '#fff', padding: '15px' }} />
    );
  }
}

export default Join;
