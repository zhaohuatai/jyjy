import React, {Component} from 'react';
import {Modal, List, Checkbox, Toast} from 'antd-mobile';

const CheckboxItem = Checkbox.CheckboxItem;

class SelectStep2 extends Component {
  state = {
    select: []
  }

  handleCheck = (value) => {
    if(this.state.select.length <= 3){
      let select = [...this.state.select];
      let index = select.indexOf(value);

      if( index >= 0 ){
        select.splice(index, 1)
      } else {
        select.push(value);
      }

      this.setState({ select })
    } else {
      Toast.info('只能选择三道题',2);
    }
  }

  handleSubmit = () => {
    if(this.state.select.length === 3){
      this.props.onPay(this.state.select.join())
    } else {
      Toast.info('请选择三道题',2)
    }
  }

  onWrapTouchStart = (e) => {
    // fix touch to scroll background page on iOS
    if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
      return;
    }
    const pNode = closest(e.target, '.am-modal-content');
    if (!pNode) {
      e.preventDefault();
    }
  }

  render() {
    const {data, submit, display, onPay} = this.props;
    return (
      <Modal
        visible={display}
        transparent
        title='请选择最喜欢的三道题'
        maskClosable={false}
        onClose={() => onCancle()}
        style={{width: '90%'}}
        footer={[
          {text: '提交', onPress: this.handleSubmit},
        ]}
        wrapProps={{ onTouchStart: this.onWrapTouchStart }}
      >
        <div style={{ height: 200, overflow: 'scroll' }}>
          <List>
            {
              data.length > 0 ? data.map(i => (
                <CheckboxItem
                  key={i.evalSubject.id}
                  wrap
                  onChange={() => this.handleCheck(i.evalSubject.id)}
                  style={{ fontSize: '11px'}}
                >
                  <List.Item.Brief>{i.evalSubject.title}</List.Item.Brief>
                </CheckboxItem>
              ))
                :
                null
            }
          </List>
        </div>
      </Modal>
    );
  }
}

export default SelectStep2;
