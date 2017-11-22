import React, { Component } from 'react';
import { Modal, List, Checkbox } from 'antd-mobile';

const CheckboxItem = Checkbox.CheckboxItem;

class BuyCourseItem extends Component {
  render() {
    const {data, submit, display, onCancle, onSubmit} = this.props;
    return (
      <Modal
        visible={display}
        transparent
        maskClosable={false}
        onClose={()=>onCancle()}
        style={{width: '90%'}}
        footer={[
          { text: '取消', onPress: () => onCancle() },
          { text: '购买', onPress: () => onSubmit },
          ]}
      >
        <div>
          <List>
            {data.map(i => (
              <CheckboxItem key={i.serviceCourseItem.name} >
                {i.serviceCourseItem.name}
              </CheckboxItem>
            ))}
          </List>
        </div>
      </Modal>
    );
  }
}

export default BuyCourseItem;
