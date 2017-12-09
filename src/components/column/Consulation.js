import React, { Component } from 'react';
import { List, Toast, Modal } from 'antd-mobile';
import { createColumnChannelComment } from '../../service/column'

const Item = List.Item;
const Brief = Item.Brief;

class Consulation extends Component {
  handleConsultation = (value) => {
    console.log(value);
    createColumnChannelComment({channelItemId: this.props.id, content: value}).then(data => {
      Toast.success('留言成功')
    })
  }

  handleShowConsultation = () => {
    Modal.prompt('发表评论', '',
      [
        { text: '取消' },
        {
          text: '发表',
          onPress: this.handleConsultation,
        },
      ], 'default', null, [''])
  }
  render() {
    return (
      <div style={{backgroundColor: '#fff'}}>
        <div style={{height: '30px', textAlign: 'right', lineHeight: '30px', padding: '0 15px', color: '#2fc2ba'}}>
          <span onClick={this.handleShowConsultation}>发表评论</span>
        </div>
        <List>
          {
            this.props.data.map(item => {
              return <Item key={item.columnChannelComment.id} multipleLine platform="android" extra={item.columnChannelComment.createTime} align="top">
                {item.columnChannelComment.memberName} <Brief>{item.columnChannelComment.content}</Brief>
              </Item>
            })
          }
        </List>
      </div>
    );
  }
}


export default Consulation;
