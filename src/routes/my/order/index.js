import React, {Component} from 'react';
import { loadColumnChannelOrderDataSet, loadServiceCourseOrderDataSet } from '../../../service/user';
import { Tabs, List, Button } from 'antd-mobile';
import LoadMore from '../../../components/loadmore/LoadMore';
import CourseOrderItem from "./course/CourseOrderItem";
import ColumnOrderItem from "./column/CloumnOrderItem";
import {API_DOMAIN} from "../../../utils/config";

const tabs = [
  { title: '专栏订单' },
  { title: '课堂订单' },
]

class Order extends Component {
  state = {
    column_orders: [],
    course_orders: [],
    column_loadmore_disable: true,
    course_loadmore_disable: true,
  }

  componentDidMount() {
    loadColumnChannelOrderDataSet().then(data => {
      this.setState({ column_orders: data.data.dataSet.rows })
    });

    loadServiceCourseOrderDataSet().then(data => {
      this.setState({ course_orders: data.data.dataSet.rows})
    });
  }

  handleColumnPay = ({id, payFee}) => {
    console.log(id, payFee);
    localStorage.ordersId = id;
    localStorage.payFee = payFee;
    localStorage.orderType = 'column';

    console.log(localStorage);

    window.location.href= API_DOMAIN + 'wxpay/enterpay/';
  }

  handleCoursePay = ({id, payFee}) => {
    console.log(id, payFee);
    localStorage.ordersId = id;
    localStorage.payFee = payFee;
    localStorage.orderType = 'course';

    console.log(localStorage);

    window.location.href= API_DOMAIN + 'wxpay/enterpay/';
  }

  handleCancle = (id) => {

  }

  render() {
    return (
      <div>
        <Tabs
          tabs={tabs}
          onChange={this.handleChangeTab}
        >
          <List style={{marginBottom:'54px'}}>
            {
              this.state.column_orders.map(item => {
                return (
                  <ColumnOrderItem data={item} key={item.columnChannelOrder.id} doPay={this.handleColumnPay}/>
                )
              })
            }
            <LoadMore disable={this.state.column_loadmore_disable} onClick={this.loadMore}/>
          </List>
          <List style={{marginBottom:'54px'}}>
            {
              this.state.course_orders.map(item => {
                return (
                  <CourseOrderItem data={item} key={item.serviceCourseOrder.id} doPay={this.handleCoursePay}/>
                )
              })
            }
            <LoadMore disable={this.state.course_loadmore_disable} onClick={this.loadMore} />
          </List>
        </Tabs>
      </div>
    );
  }
}

export default Order;
