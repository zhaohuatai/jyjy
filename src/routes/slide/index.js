import React, { Component } from 'react';
import { loadPubSlide } from '../../service/slide';
import { API_DOMAIN, IMG_DOMAIN } from '../../utils/config';
import WXshare from '../../utils/WXshare';

class SlideDetail extends Component {
  state = {
    pubSlide: {
      "content": "",
      "createTime": "",
      "id": '',
      "imgUrl": "",
      "isEnabled": "",
      "locationCode": "",
      "locationName": "",
      "recordTime": '',
      "remark": "",
      "showWeight": 1,
      "status": 2,
      "title": "",
      "updateTime": "2017-12-04 13:50:11"
    }
  }

  componentDidMount() {
    const id = this.props.params.id;

    loadPubSlide({id}).then(data => {
      this.setState({pubSlide: data.data.pubSlide})
    })

    WXshare({
      title: '经英教育',
      link: `${API_DOMAIN}#/slide/${id}`,
      imgUrl: `${API_DOMAIN}static/WechatIMG290.png`,
    });
  }


  render() {
    const { imgUrl, content, title, updateTime } = this.state.pubSlide;
    return (
      <div>
        {
          this.state.pubSlide.imgUrl ? <img src={`${IMG_DOMAIN}${imgUrl}`} style={{width:'100%', height: '176px'}}/> : null
        }
        <div style={{ backgroundColor: '#fff', padding: '15px' }}>
          <p style={{fontSize: '18px'}}>{title}</p>
          <p style={{fontSize: '13px', color: '#bebebe', borderBottom: '1px solid #bebebe', paddingBottom: '8px'}}>{updateTime}</p>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
    );
  }
}

export default SlideDetail;
