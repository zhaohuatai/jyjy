import React, {Component} from 'react';
import {loadPubCustomize} from '../../service/customize';
import {Flex} from 'antd-mobile';
import BottomAction from "../../components/debris/BottomAction";
import WXshare from '../../utils/WXshare';
import { API_DOMAIN } from '../../utils/config';

class Introduce extends Component {
  state = {
    pubCustomize: {
      "content": "",
      "id": 3,
      "isEnabled": "",
      "key": "CONSULT",
      "recordTime": 1510736638131,
      "status": ""
    }
  }

  componentDidMount() {
    loadPubCustomize({key: 'CONSULT'}).then(data => {
      this.setState({pubCustomize: data.data.pubCustomize})
    });

    WXshare({
      title: '经英教育-咨询',
      link: `${API_DOMAIN}#/consult`,
      imgUrl: `${API_DOMAIN}static/WechatIMG290.png`,
    });
  }

  handlePhone = () => {
    window.location.href = "tel:10086";
  }

  render() {
    const style = {
      position: 'fixed',
      zIndex: '100',
      bottom: '50px',
      height: '50px',
      lineHeight: '50px',
      width: '100%',
      textAlign: 'center',
      color: '#fff',
      backgroundColor: '#2fc3ba',
    }

    return (
      <div style={{marginBottom: '104px'}}>
        <div dangerouslySetInnerHTML={{__html: this.state.pubCustomize.content}}
             style={{backgroundColor: '#fff', padding: '15px'}}/>
        <Flex style={style}>
          <Flex.Item>
            <a href="tel:053185551680" style={{ color: '#fff' }}>现在电话咨询</a>
          </Flex.Item>
        </Flex>
      </div>
    )
  }
}

export default Introduce;
