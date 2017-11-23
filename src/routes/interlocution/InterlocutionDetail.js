import React, { Component } from 'react';
import { loadInterlocution } from '../../service/interlocution';
import { List } from 'antd-mobile';

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
    });
  }

  render() {
    const { createTime, interQuestion, interAnswer } = this.state.data;

    return (
      <div>
        <Item
          multipleLine
        >
          {interQuestion}  <Brief>{createTime}</Brief>
        </Item>
        <div dangerouslySetInnerHTML={{ __html: interAnswer }} style={{ backgroundColor: '#fff', padding: '15px' }} />
      </div>
    );
  }
}

export default QuestionDetail;
