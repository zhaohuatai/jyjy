import React, { Component } from 'react';
import { loadEnrollAutoQuestion } from '../../../service/bigdata';
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
    loadEnrollAutoQuestion({ id }).then( data => {
      this.setState({ data: data.data.enrollAutoQuestion });
    });
  }

  render() {
    const { createTime } = this.state.data;

    return (
      <div>
        <Item
          multipleLine
          extra={createTime}
        >
          {this.state.data.title}  <Brief>浏览({this.state.data.browseCount}) 收藏({this.state.data.favoriteCount})</Brief>
        </Item>
        <div dangerouslySetInnerHTML={{ __html: this.state.data.content }} style={{ backgroundColor: '#fff', padding: '15px' }} />
      </div>
    );
  }
}

export default QuestionDetail;
