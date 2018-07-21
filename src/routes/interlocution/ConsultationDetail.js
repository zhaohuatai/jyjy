import React, { Component } from 'react';
import { loadInterlocutionConsultation } from '../../service/interlocution';
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
        consultorName: '问答',
        content: '',
        createTime: '',
        handleTime: '',
        id: 0,
        isEnabled: '',
        memberId: 1,
        onlineReply: '',
        phone: '',
        recordTime: '',
        remark: '',
        status: '',
        updateTime: '',
      },
    };
  }

  componentDidMount() {
    const id = this.props.params.id;
    loadInterlocutionConsultation({ id }).then((data) => {
      this.setState({ data: data.data.interlocutionConsultation });

      WXshare({
        title: `百科问答-${data.data.interlocutionConsultation.consultorName}`,
        desc: '经英教育',
        link: `${API_DOMAIN}?redirect_url=interlocution/consultation/${id}`,
        imgUrl: `${API_DOMAIN}static/WechatIMG290.png`,
      });
    });
  }

  render() {
    const { createTime, consultorName, content, handleTime } = this.state.data;

    return (
      <div>
        <Item
          multipleLine
          wrap
        >
          {consultorName}  <Brief>提问时间：{createTime} <br /> 回复时间：{handleTime}</Brief>
        </Item>
        <div dangerouslySetInnerHTML={{ __html: content }} style={{ backgroundColor: '#fff', padding: '15px', overflow: 'hidden' }} />
      </div>
    );
  }
}

export default QuestionDetail;
