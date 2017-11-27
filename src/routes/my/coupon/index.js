import React, {Component} from 'react';
import {Accordion, List} from 'antd-mobile';
import CouponListItem from './CouponListItem';
import {loadMemberCouponDataSet} from '../../../service/coupon';

class MyCoupon extends Component {
  state = {
    coupons: []
  }

  componentDidMount() {
    loadMemberCouponDataSet().then(data => {
      this.setState({coupons: data.data.dataSet.rows});
    })
  }

  render() {
    return (
      <div>
        <List>
          {
            this.state.coupons.map(item => {
              return <CouponListItem data={item.coupon} key={item.coupon.id}/>
            })
          }
        </List>
      </div>
    );
  }
}

export default MyCoupon;
