import React, { Component } from 'react';
import { Modal, Toast } from 'antd-mobile';
import { loadPubCustomize } from '../../service/customize';
import BottomAction from "../../components/debris/BottomAction";
import { verifyVipCard, createMemberVipOrder } from '../../service/user';
import { API_DOMAIN } from '../../utils/config';
const prompt = Modal.prompt;

class MemberExclusive extends Component {
  state = {
    pubCustomize: {
      "content":"",
      "id":3,
      "isEnabled":"",
      "key":"MEMBER_EXCLUSIVE",
      "recordTime":1510736638131,
      "status":""
    },
    exchange_show: false,
    exchange_form: {
      schoolName: '',
      vipNum: '',
      vipPwd: ''
    }
  }

  handlePayVip = () => {
    prompt(
      '购买VIP',
      '请输入就读学校',
      (schoolName) => {
        if(schoolName){
          createMemberVipOrder({schoolName}).then(data => {
            if(data.statusCode === 200){
              console.log(data);
              localStorage.ordersId = data.data.memberVipOrder.id;
              localStorage.payFee = data.data.memberVipOrder.payFee;
              localStorage.orderType = 'memberdeposit';

              window.location.href= API_DOMAIN + 'wxpay/enterpay/';
            } else {
               Toast.fail('开通失败',2)
            }
          })
        } else {
          Toast.fail('学校不能为空',1)
        }

      },
      'default',
      null,
      ['学校'],
    )
  }

  handleExchange = () => {
    this.setState({exchange_show: true});
  }

  handleCloseExchange = () => {
    this.setState({exchange_show: false});
  }

  doExchange = () => {
    console.log(this.state.exchange_form);
    this.handleCloseExchange();
    verifyVipCard(this.state.exchange_form).then(data => {
      Toast.success('兑换成功',1);
    })
  }

  componentDidMount() {
    loadPubCustomize({ key: 'MEMBER_EXCLUSIVE' }).then(data => {
      this.setState({pubCustomize: data.data.pubCustomize})
    })
  }


  render() {
    return (
      <div>
        <div dangerouslySetInnerHTML={{ __html: this.state.pubCustomize.content }} style={{ backgroundColor: '#fff', padding: '15px' }} />
        <BottomAction
          buttons={[
            {label: 'VIP认证', action: this.handleExchange, backgroundColor: '#fff', color: '#2fc3ba'},
            {label: '购买VIP', action: this.handlePayVip, backgroundColor: '#2fc3ba', color: '#fff' },
          ]}
        />

        <Modal
          visible={this.state.exchange_show}
          transparent
          maskClosable={false}
          onClose={this.handleCloseExchange}
          title="兑换VIP卡"
          footer={[
            { text: '取消', onPress: this.handleCloseExchange },
            { text: '确定', onPress: () => { this.doExchange() } }
            ]}
          wrapProps={{ onTouchStart: this.onWrapTouchStart }}
        >
          <div>
            <div className="am-modal-input-container">
              <div className="am-modal-input">
                <label>
                  <input
                    type="text"
                    placeholder="学校"
                    value={this.state.exchange_form.schoolName}
                    onChange={ e =>
                      this.setState({exchange_form: {...this.state.exchange_form, schoolName: e.target.value}})
                    }
                  />
                </label>
              </div>
            </div>
            <div className="am-modal-input-container">
              <div className="am-modal-input">
                <label>
                  <input
                    type="text"
                    placeholder="学校"
                    value={this.state.exchange_form.vipNum}
                    onChange={ e =>
                      this.setState({exchange_form: {...this.state.exchange_form, vipNum: e.target.value}})
                    }
                  />
                </label>
              </div>
              <div className="am-modal-input">
                <label>
                  <input
                    type="password"
                    placeholder="学校"
                    value={this.state.exchange_form.vipPwd}
                    onChange={ e =>
                      this.setState({exchange_form: {...this.state.exchange_form, vipPwd: e.target.value}})
                    }
                  />
                </label>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default MemberExclusive;
