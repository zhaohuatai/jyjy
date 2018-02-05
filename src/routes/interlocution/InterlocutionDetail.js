import React, { Component } from 'react';
import { loadInterlocution } from '../../service/interlocution';
import { List } from 'antd-mobile';
import WXshare from '../../utils/WXshare';
import { API_DOMAIN } from '../../utils/config';

const Item = List.Item;
const Brief = Item.Brief;

class QuestionDetail extends Component {
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
    loadInterlocution({ id }).then( data => {
      this.setState({ data: data.data.interlocution });

      WXshare({
        title: `百科问答-${data.data.interlocution.interQuestion}`,
        desc: '经英教育',
        link: `${API_DOMAIN}?redirect_url=interlocution/${id}`,
        imgUrl: `${API_DOMAIN}static/WechatIMG290.png`,
      });
    });
  }

  render() {
    const { createTime, interQuestion, interAnswer } = this.state.data;

    return (
      <div>
        <Item
          multipleLine
          wrap
        >
          {interQuestion}  <Brief>{createTime}</Brief>
        </Item>
        <div dangerouslySetInnerHTML={{ __html: interAnswer }} style={{ backgroundColor: '#fff', padding: '15px' }} />
      </div>
    );
  }
}

export default QuestionDetail;
