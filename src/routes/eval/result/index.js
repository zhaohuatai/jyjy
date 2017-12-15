import React, { Component } from 'react';
import { loadRecordResultDtoByRecordId } from '../../../service/eval';
import { List } from 'antd-mobile';

const Item = List.Item;
const Brief = Item.Brief;

class EvalResult extends Component {
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
    const { recordId, categoryId, categoryName } = this.props.location.query;

    loadRecordResultDtoByRecordId({ recordId }).then( data => {
      this.setState({ news: data.data.pubNews });
    });
  }

  render() {
    const { categoryId, categoryName } = this.props.location.query;

    return (
      <div>
        <Item
          multipleLine
          wrap
        >
          {categoryName}-结果  <Brief> 测评时间：{this.state.news.createTime}</Brief>
        </Item>
        <div dangerouslySetInnerHTML={{ __html: this.state.news.content }} style={{ backgroundColor: '#fff', padding: '15px' }} />      
      </div>
    );
  }
}

export default EvalResult;
