import React, {Component} from 'react';
import { hashHistory } from 'react-router';
import BottomAction from "../../components/debris/BottomAction";
import { loadServiceCourseDto, createServiceCourseOrder } from '../../service/course';
import {loadMemberCouponDataSet} from '../../service/coupon';

import { List, Tabs, Button, Badge, Checkbox, Toast } from 'antd-mobile';
import {API_DOMAIN} from "../../utils/config";
import WXshare from '../../utils/WXshare';

const Item = List.Item;
const Brief = Item.Brief;
const CheckboxItem = Checkbox.CheckboxItem;

class PlayCourseOrder extends Component {
  state = {
    serviceCourseItemResDtoList:[],
    serviceCourse: {
      name: ''
    },
    coupons: [],
    select_coupon:[],
    select_course:[],
  }

  componentDidMount() {
    const id = this.props.params.id;

    WXshare({
      title: '经英教育',
      link: `${API_DOMAIN}?redirect_url=`,
      imgUrl: `${API_DOMAIN}static/WechatIMG290.png`,
    });

    loadServiceCourseDto({courseId:id}).then(data => {
      this.setState({ serviceCourseItemResDtoList: data.data.serviceCourseDto.serviceCourseItemResDtoList,  serviceCourse: data.data.serviceCourseDto.serviceCourse})
    })

    loadMemberCouponDataSet({rows: 1000, status: 1}).then(data => {
      this.setState({coupons: data.data.dataSet.rows});
    });
  }

  handlePlayOrder = () => {
    let courseItemIds = this.state.select_course.join();
    let memberCouponIds = this.state.select_coupon.join();
    createServiceCourseOrder({courseItemIds, memberCouponIds }).then(data => {
      if (data.data.orderDetail.serviceCourseOrder.orderStatus == 2){
        Toast.success('购买成功',1);
        hashHistory.push(`/course/${this.props.params.id}`);
      } else {
        Toast.success('下单成功,请去我的订单查看',1);
        hashHistory.push('/my/order');
      }
    })
  }

  handlePlayOrderPay = () => {
    let courseItemIds = this.state.select_course.join();
    let memberCouponIds = this.state.select_coupon.join();
    createServiceCourseOrder({courseItemIds, memberCouponIds }).then(data => {
      if (data.data.orderDetail.serviceCourseOrder.orderStatus == 2){
        Toast.success('购买成功',1);
        hashHistory.push(`/course/${this.props.params.id}`);
      } else {
        localStorage.ordersId = data.data.orderDetail.serviceCourseOrder.id;
        localStorage.payFee = data.data.orderDetail.serviceCourseOrder.payFee;
        localStorage.orderType = 'course';

        window.location.href= API_DOMAIN + 'wxpay/enterpay/';
      }
    })
  }

  handleCheck = (value) => {
    let select_coupon = [...this.state.select_coupon];
    let index = select_coupon.indexOf(value);

    if( index >= 0 ){
      select_coupon.splice(index, 1)
    } else {
      select_coupon.push(value);
    }

    this.setState({ select_coupon })
  }

  handleCheckCourseItem = (value) => {
    let select_course = [...this.state.select_course];
    let index = select_course.indexOf(value);

    if( index >= 0 ){
      select_course.splice(index, 1)
    } else {
      select_course.push(value);
    }

    this.setState({ select_course })
  }

  render() {
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
            {this.state.serviceCourse.name}
          </Item>
          {
            this.state.serviceCourseItemResDtoList.length > 0 ?

              this.state.serviceCourseItemResDtoList.map(item=>{
                return (
                  <CheckboxItem
                    key={item.serviceCourseItem.id}
                    data-seed="logId"
                    onChange={() => this.handleCheckCourseItem(item.serviceCourseItem.id)}
                    multipleLine
                    extra={`¥${item.serviceCourseItem.price/100}`}
                  >
                    {item.serviceCourseItem.name}
                  </CheckboxItem>
                )
              })
              :
              <CheckboxItem key="disabled" data-seed="logId" disabled defaultChecked multipleLine>
                没有可用优惠券
              </CheckboxItem>
          }
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
                    extra={`面值 ¥${item.coupon.faceValue/100}`}
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

export default PlayCourseOrder;
