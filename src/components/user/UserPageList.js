import React from 'react';
import { List } from 'antd-mobile';
import { hashHistory } from 'react-router';

const Item = List.Item;

const UserPageList = () => {
  return (
    <List>
      <Item
        thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
        arrow="horizontal"
        onClick={() => hashHistory.push('/my/order')}
      >
        我的订单
      </Item>
      <Item
        thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
        arrow="horizontal"
        onClick={() => hashHistory.push('/my/favorite')}
      >
        我的收藏
      </Item>
      <Item
        thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png"
        onClick={() => hashHistory.push('/my/employ')}
        arrow="horizontal"
      >
        应聘推广员
      </Item>
      <Item
        thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png"
        onClick={() => hashHistory.push('/my/memberexclusive')}
        arrow="horizontal"
      >
        开通VIP
      </Item>
      <Item
        thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png"
        onClick={() => hashHistory.push('/my/coupon')}
        arrow="horizontal"
      >
        我的优惠券
      </Item>
      <Item
        thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png"
        onClick={() => hashHistory.push('/my/join')}
        arrow="horizontal"
      >
        加入社群
      </Item>
    </List>
  );
};

export default UserPageList;
