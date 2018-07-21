import React, { Component } from 'react';
import { loadEnrollAutoBigdata } from '../../../service/bigdata';
import { List } from 'antd-mobile';

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
    });
  }

  render() {
    return (
      <div>
        <Item multipleLine>
          {this.state.news.title}  <Brief>{this.state.data.addtime}</Brief>
        </Item>
        <div dangerouslySetInnerHTML={{ __html: this.state.data.content }} style={{ backgroundColor: '#fff', padding: '15px', , overflow: 'hidden' }} />
      </div>
    );
  }
}

export default NewsDetail;
