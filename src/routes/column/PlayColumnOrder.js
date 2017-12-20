import React, {Component} from 'react';
import { hashHistory } from 'react-router';
import BottomAction from "../../components/debris/BottomAction";
import { loadItemResDtoByItemId, createColumnChannelOrder } from '../../service/column';
import {loadMemberCouponDataSet} from '../../service/coupon';

import { List, Tabs, Button, Badge, Checkbox, Toast } from 'antd-mobile';
import {API_DOMAIN} from "../../utils/config";

const Item = List.Item;
const Brief = Item.Brief;
const CheckboxItem = Checkbox.CheckboxItem;

class PlayColumnOrder extends Component {
  state = {
    columnChannelItem:{},
    columnChannel: {
      title: ''
    },
    coupons: [],
    select:[]
  }

  componentDidMount() {
    const id = this.props.params.id;

    loadItemResDtoByItemId({itemId:id}).then(data => {
      this.setState({ columnChannelItem: data.data.itemRes.columnChannelItem,  columnChannel: data.data.itemRes.columnChannel})
    })

    loadMemberCouponDataSet({rows: 1000}).then(data => {
      this.setState({coupons: data.data.dataSet.rows});
    });
  }

  handlePlayOrder = () => {
    let memberCouponIds = this.state.select.join();
    createColumnChannelOrder({channelItemIds: this.props.params.id, memberCouponIds }).then(data => {
      Toast.success('下单成功');
      hashHistory.push('/my/order')
    })
  }

  handlePlayOrderPay = () => {
    let memberCouponIds = this.state.select.join();
    createColumnChannelOrder({channelItemIds: this.props.params.id, memberCouponIds }).then(data => {
      // Toast.success('下单成功');
      // console.log(id, payFee);
      localStorage.ordersId = data.data.orderDetail.columnChannelOrder.id;
      localStorage.payFee = data.data.orderDetail.columnChannelOrder.payFee;
      localStorage.orderType = 'column';

      window.location.href= API_DOMAIN + 'wxpay/enterpay/';
    })
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
    const { title, coverUrl, priceVIP, price } = this.state.columnChannelItem;
    return (
      <div>
        <List
          renderHeader={'购买内容'}
        >
          <Item
            onClick={() => hashHistory.push(`/column/${id}`)}
            align="top"
            multipleLine
          >
            {this.state.columnChannel.title}
          </Item>
          <Item
            onClick={() => hashHistory.push(`/column/${id}`)}
            align="top"
            thumb = {<img style={{ width:'60px', height:'60px' }} src={coverUrl}/>}
            multipleLine
            wrap
          >
            {title}<Brief><span style={{ color: '#red'}}>普通 ¥{price}/<span style={{color: 'red'}}>VIP ¥{priceVIP}</span></span></Brief>
          </Item>
        </List>

        <List
          renderHeader={'选择优惠券'}
        >
          {
            this.state.coupons.length > 0 ?

              this.state.coupons.map(item=>{
                return (
                  <CheckboxItem
                    key={item.memberCoupon.id}
                    data-seed="logId"
                    onChange={() => this.handleCheck(item.memberCoupon.id)}
                    multipleLine
                  >
                    {item.coupon.name}
                  </CheckboxItem>
                )
              })
              :
              <CheckboxItem key="disabled" data-seed="logId" disabled defaultChecked multipleLine>
                没有可用优惠券
              </CheckboxItem>
          }
        </List>

        <div>
          <BottomAction
            buttons={[
              {label: '立即下单', action: this.handlePlayOrder, backgroundColor: '#fff', color: '#2fc3ba'},
              {label: '立即购买', action: this.handlePlayOrderPay, backgroundColor: '#2fc3ba', color: '#fff' },
            ]}
          />
        </div>
      </div>

    );
  }
}

export default PlayColumnOrder;
