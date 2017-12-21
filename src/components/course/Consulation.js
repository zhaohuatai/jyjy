import React, { Component } from 'react';
import { List, Toast, Modal } from 'antd-mobile';
import { createServiceCourseConsultation } from '../../service/course'

const Item = List.Item;
const Brief = Item.Brief;

class Consulation extends Component {
  handleConsultation = (value) => {
    console.log(value);
    createServiceCourseConsultation({courseId: this.props.id, content: value}).then(data => {
      Toast.success('留言成功',1)
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
              return <Item key={item.serviceCourseConsultation.id} multipleLine platform="android" extra={item.serviceCourseConsultation.createTime} align="top">
                {item.serviceCourseConsultation.memberName} <Brief>{item.serviceCourseConsultation.content}</Brief>
              </Item>
            })
          }
        </List>
      </div>
    );
  }
}


export default Consulation;
