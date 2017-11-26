import React, {Component} from 'react';
import { List, WhiteSpace } from 'antd-mobile';
import { loadColumnChannelOrder } from '../../../../service/column';

const Item = List.Item;
const Brief = List.Item.Brief;

class ColumnOrderDetail extends Component {
  state = {
    order_detail: {}
  }
  componentDidMount() {
    const id = this.props.params.id;

    loadColumnChannelOrder({id}).then(data => {
      this.setState({
        order_detail: data.data.columnChannelOrder.columnChannelOrder
      });
    })
  }

  render() {
    const { order_detail } = this.state;
    return (
      <div>
        <List>
          <Item
            wrap={true}
            multipleLine
          >
            订单内容 <Brief>{order_detail.memo}</Brief>
          </Item>
        </List>
        <WhiteSpace />
        <List>
          <Item extra={<span style={{color: 'red'}}>¥{order_detail.payFee}</span>}>
            实付款
          </Item>
          <Item extra={<span>{order_detail.memberName}</span>}>
            买家姓名
          </Item>
          <Item>
            创建时间
            <Brief>{order_detail.createTime}</Brief>
          </Item>

          <Item
            wrap={true}
            multipleLine
          >
            订单号 <Brief>{order_detail.ordersn}</Brief>
          </Item>
          <Item
            wrap={true}
            multipleLine
          >
            留言 <Brief>{order_detail.memo}</Brief>
          </Item>
        </List>
      </div>
    );
  }
}

export default ColumnOrderDetail;
