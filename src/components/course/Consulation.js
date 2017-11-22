import React, { Component } from 'react';
import { List } from 'antd-mobile';

const Item = List.Item;
const Brief = Item.Brief;

class Consulation extends Component {
  render() {
    return (
      <div>
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
