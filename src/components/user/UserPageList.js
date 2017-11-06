import React from 'react';
import { List } from 'antd-mobile';

const Item = List.Item;

const UserPageList = () => {
  return (
    <List>
      <Item
        thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
        arrow="horizontal"
        onClick={() => {}}
      >
        我的收藏
      </Item>
      <Item
        thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png"
        onClick={() => {}}
        arrow="horizontal"
      >
        应聘推广员
      </Item>
      <Item
        thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png"
        onClick={() => {}}
        arrow="horizontal"
      >
        开通VIP
      </Item>
      <Item
        thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png"
        onClick={() => {}}
        arrow="horizontal"
      >
        我的课程
      </Item>
      <Item
        thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png"
        onClick={() => {}}
        arrow="horizontal"
      >
        我的优惠券
      </Item>
      <Item
        thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png"
        onClick={() => {}}
        arrow="horizontal"
      >
        加入社群
      </Item>
      <Item
        thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png"
        onClick={() => {}}
        arrow="horizontal"
      >
        购买记录
      </Item>
      <Item
        thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png"
        onClick={() => {}}
        arrow="horizontal"
      >
        我的资料
      </Item>
    </List>
  );
};

export default UserPageList;
