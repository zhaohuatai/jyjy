import React, {Component} from 'react';
import { List, WhiteSpace } from 'antd-mobile';
import { hashHistory } from 'react-router';
import { loadColumnChannelOrder } from '../../../../service/column';
import OrderStatus from "../../../../components/debris/OrderStatus";
import {IMG_DOMAIN} from "../../../../utils/config";

const Item = List.Item;
const Brief = List.Item.Brief;

class ColumnOrderDetail extends Component {
  state = {
    order_detail: {
      member: {},
      columnChannelOrder: {},
      columnChannelItemResDtoList: []
    }
  }
  componentDidMount() {
    const id = this.props.params.id;

    loadColumnChannelOrder({id}).then(data => {
      this.setState({
        order_detail: data.data.columnChannelOrder
      });
    })
  }

  render() {
    console.log(this.state);
    const { member, columnChannelOrder, columnChannelItemResDtoList}  = this.state.order_detail;
    const { createTime, memo, orderStatus, payFee, paymentStatus, ordersn, memberName } = columnChannelOrder;
    const { phone } = member;

    return (
      <div>
        <List
          renderHeader={'订单详情'}
        >
          <Item extra={<OrderStatus orderStatus={orderStatus}/>}>
            订单状态
          </Item>
          <Item extra={<span style={{color: 'red'}}>¥{payFee*0.01}</span>}>
            实付款
          </Item>
          <Item extra={<span>{memberName}</span>}>
            买家姓名
          </Item>
          <Item extra={<span>{phone}</span>}>
            买家电话
          </Item>
          <Item>
            创建时间
            <Brief>{createTime}</Brief>
          </Item>

          <Item
            wrap={true}
            multipleLine
          >
            订单号 <Brief>{ordersn}</Brief>
          </Item>
          <Item
            wrap={true}
            multipleLine
          >
            留言 <Brief>{memo ? memo : '无'}</Brief>
          </Item>
        </List>

        <List
          renderHeader={'购买内容'}
        >
          {
            columnChannelItemResDtoList.map(item => {
              return (
                <Item
                  thumb = {<img style={{ width:'60px', height:'60px' }} src={`${IMG_DOMAIN}${item.columnChannelItem.coverUrl}`}/>}
                  key={item.columnChannelItem.id}
                  extra={<span>¥{item.columnChannelItem.price/100} / <span>VIP¥{item.columnChannelItem.priceVIP/100}</span>  </span>}
                  arrow="horizontal"
                  wrap
                  onClick={()=>hashHistory.push({
                    pathname: `/columnitem/${item.columnChannelItem.id}`,
                  })}
                >
                  {item.columnChannelItem.title} <Brief>{item.columnChannelItem.hint}</Brief>
                </Item>
              )
            })
          }
        </List>
      </div>
    );
  }
}

export default ColumnOrderDetail;
