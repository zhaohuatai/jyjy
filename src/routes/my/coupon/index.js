import React, {Component} from 'react';
import {Tabs, List} from 'antd-mobile';
import CouponListItem from './CouponListItem';
import MyCouponListItem from './MyCouponListItem';
import { Modal, Toast } from 'antd-mobile';
import {loadMemberCouponDataSet, loadCouponDataSet, createMemberCoupon} from '../../../service/coupon';

class MyCoupon extends Component {
  state = {
    coupons: [],
    all_coupons: []
  }

  componentDidMount() {
    loadMemberCouponDataSet({rows: 1000}).then(data => {
      this.setState({coupons: data.data.dataSet.rows});
    });

    loadCouponDataSet({rows: 1000}).then(data => {
      this.setState({all_coupons: data.data.dataSet.rows});
    })
  }

  handleExchange = (id) => {
    Modal.alert('兑换优惠券', '是否立即兑换优惠券', [
      { text: '取消', },
      { text: '兑换', onPress: () => createMemberCoupon({couponId: id}).then(data=>{
        Toast.success('兑换成功');
        loadMemberCouponDataSet({rows: 1000}).then(data => {
          this.setState({coupons: data.data.dataSet.rows});
        });
      }) },
    ])
  }

  render() {
    return (
      <div>
        <Tabs
          tabs={[{title: '所有'}, {title: '我的'}]}
              initialPage={1}
              onChange={(tab, index) => { console.log('onChange', index, tab); }}
              onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
        >
          <List>
            {
              this.state.all_coupons.map(item => {
                return <CouponListItem
                  data={item}
                  key={item.id}
                  doExchange={this.handleExchange}
                />
              })
            }
          </List>
          <List>
            {
              this.state.coupons.map(item => {
                return <MyCouponListItem data={item.coupon} key={item.memberCoupon.id}/>
              })
            }
          </List>
        </Tabs>

      </div>
    );
  }
}

export default MyCoupon;
