import React, { Component } from 'react';
import { loadPubNews } from '../../service/news';
import { List } from 'antd-mobile';

const Item = List.Item;
const Brief = Item.Brief;

class NewsDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: {
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
    loadPubNews({ id }).then( data => {
      this.setState({ news: data.data.pubNews });
    });
  }

  render() {
    return (
      <div>
        <Item
          multipleLine
          wrap
        >
          {this.state.news.title}  <Brief>{this.state.news.createTime}</Brief>
        </Item>
        <div dangerouslySetInnerHTML={{ __html: this.state.news.content }} style={{ backgroundColor: '#fff', padding: '15px' }} />      
      </div>
    );
  }
}

export default NewsDetail;
