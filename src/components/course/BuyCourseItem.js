import React, {Component} from 'react';
import {Modal, List, Checkbox} from 'antd-mobile';

const CheckboxItem = Checkbox.CheckboxItem;

class BuyCourseItem extends Component {
  state = {
    select: []
  }

  handleCheck = (value) => {
    let select = [...this.state.select];
    let index = select.indexOf(value);

    if( index >= 0 ){
      select.splice(index, 1)
    } else {
      select.push(value);
    }

    this.setState({ select })
  }

  render() {
    const {data, submit, display, onCancle, onPay} = this.props;
    return (
      <Modal
        visible={display}
        transparent
        title='购买课程'
        maskClosable={false}
        onClose={() => onCancle()}
        style={{width: '90%'}}
        footer={[
          {text: '取消', onPress: () => onCancle()},
          {text: '购买', onPress: () => onPay(this.state.select.join())},
        ]}
      >
        <div>
          <List>
            {
              data.length > 0 ? data.map(i => (
                <CheckboxItem
                  key={i.serviceCourseItem.id}
                  onChange={() => this.handleCheck(i.serviceCourseItem.id)}>
                  {i.serviceCourseItem.name}
                </CheckboxItem>
              ))
                :
                '没有课程'
            }
          </List>
        </div>
      </Modal>
    );
  }
}

export default BuyCourseItem;
