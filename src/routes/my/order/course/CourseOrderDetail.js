import React, {Component} from 'react';
import { List, WhiteSpace } from 'antd-mobile';
import { hashHistory } from 'react-router';
import { loadServiceCourseOrder } from '../../../../service/course';
import OrderStatus from "../../../../components/debris/OrderStatus";

const Item = List.Item;
const Brief = List.Item.Brief;

class ColumnOrderDetail extends Component {
  state = {
    order_detail: {
      serviceCourseOrder: {
        createTime: '',
        ordersn: ''
      },
      serviceCourseOrderItemsList: [],
      member: {}
    }
  }
  componentDidMount() {
    const id = this.props.params.id;

    loadServiceCourseOrder({id}).then(data => {
      this.setState({
        order_detail: data.data.serviceCourseOrder
      });
    })
  }

  render() {
    const { member, serviceCourseOrder, serviceCourseOrderItemsList}  = this.state.order_detail;
    const { createTime, memo, orderStatus, payFee, ordersn, memberName } = serviceCourseOrder;
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
            serviceCourseOrderItemsList.map(item => {
              return (
                <Item
                  key={item.serviceCourseItem.id}
                  extra={<span>¥{item.serviceCourseItem.price/100} / VIP <span>¥{item.serviceCourseItem.priceVIP/100}</span>  </span>}
                  arrow="horizontal"
                  onClick={()=>hashHistory.push(`/course/${item.serviceCourseItem.courseId}`)}
                >
                  {item.serviceCourseItem.name}
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
