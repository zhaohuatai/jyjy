import React, { Component } from 'react';
import { loadInterlocutionConsultation } from '../../service/interlocution';
import { List } from 'antd-mobile';

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
        <div dangerouslySetInnerHTML={{ __html: content }} style={{ backgroundColor: '#fff', padding: '15px' }} />
      </div>
    );
  }
}

export default QuestionDetail;
