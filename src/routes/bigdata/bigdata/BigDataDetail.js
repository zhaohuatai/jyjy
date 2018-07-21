import React, { Component } from 'react';
import { loadEnrollAutoBigdata } from '../../../service/bigdata';
import { List } from 'antd-mobile';
import WXshare from '../../../utils/WXshare';
import { API_DOMAIN } from '../../../utils/config';

const Item = List.Item;
const Brief = Item.Brief;

class NewsDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        addtime: '',
        content: '',
        edittime: '',
        id: 0,
        isEnabled: '',
        newsCategoryId: 0,
        recordTime: '',
        status: 1,
        title: '',
        top: '',
      },
    };
  }

  componentDidMount() {
    const id = this.props.params.id;
    loadEnrollAutoBigdata({ id }).then( data => {
      this.setState({ data: data.data.enrollAutoBigdata });

      WXshare({
        title: `${data.data.enrollAutoBigdata.title}`,
        desc: '经英教育',
        link: `${API_DOMAIN}?redirect_url=bigdata/bigdata/${id}`,
        imgUrl: `${API_DOMAIN}static/WechatIMG290.png`,
      });
    });
  }

  render() {
    return (
      <div>
        <Item multipleLine>
          {this.state.data.title}  <Brief>{this.state.data.addtime}</Brief>
        </Item>
        <div dangerouslySetInnerHTML={{ __html: this.state.data.content }} style={{ backgroundColor: '#fff', padding: '15px', overflow: 'hidden' }} />
      </div>
    );
  }
}

export default NewsDetail;
