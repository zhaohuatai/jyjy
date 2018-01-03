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
    }
  }

  handlePayVip = () => {
    prompt(
      '购买VIP',
      '请输入就读学校',
      (schoolName) => {
        console.log(schoolName);
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
    prompt(
      'VIP认证',
      '请输入升学一卡通卡号和密码',
      (vipNum, vipPwd) => verifyVipCard({vipNum, vipPwd}).then(data => {
        Toast.success('兑换成功',1);
      }),
      'login-password',
      null,
      ['卡号', '密码'],
    )
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
      </div>
    );
  }
}

export default MemberExclusive;
