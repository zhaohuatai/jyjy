import React, { Component } from 'react';
import { loadPubCustomize } from '../../service/customize';
import WXshare from '../../utils/WXshare';
import { API_DOMAIN } from '../../utils/config';

class Employ extends Component {
  state = {
    pubCustomize: {
      "content":"",
      "id":3,
      "isEnabled":"",
      "key":"EMPLOY",
      "recordTime":1510736638131,
      "status":""
    }
  }

  componentDidMount() {
    loadPubCustomize({ key: 'EMPLOY' }).then(data => {
      this.setState({pubCustomize: data.data.pubCustomize})
    });

    WXshare({
      title: '经英教育-应聘推广员',
      link: `${API_DOMAIN}?redirect_url=employ`,
      imgUrl: `${API_DOMAIN}static/WechatIMG290.png`,
    });
  }


  render() {
    return (
      <div dangerouslySetInnerHTML={{ __html: this.state.pubCustomize.content }} style={{ backgroundColor: '#fff', padding: '15px', overflow: 'hidden' }} />
    );
  }
}

export default Employ;
