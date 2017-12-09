import React from 'react';
import { List } from 'antd-mobile';
import { hashHistory } from 'react-router';

const Item = List.Item;

const UserPageList = () => {
  return (
    <List>
      <Item
        thumb={<svg className="icon" aria-hidden="true" style={{ width: '1.8em', height: '1.8em' }}><use xlinkHref='#icon-cart' /></svg>}
        arrow="horizontal"
        onClick={() => hashHistory.push('/my/order')}
      >
        我的订单
      </Item>
      <Item
        thumb={<svg className="icon" aria-hidden="true" style={{ width: '1.8em', height: '1.8em' }}><use xlinkHref='#icon-shoucang' /></svg>}
        arrow="horizontal"
        onClick={() => hashHistory.push('/my/favorite')}
      >
        我的收藏
      </Item>
      <Item
        thumb={<svg className="icon" aria-hidden="true" style={{ width: '1.8em', height: '1.8em' }}><use xlinkHref='#icon-tuiguang' /></svg>}
        onClick={() => hashHistory.push('/employ')}
        arrow="horizontal"
      >
        应聘推广员
      </Item>
      <Item
        thumb={<svg className="icon" aria-hidden="true" style={{ width: '1.8em', height: '1.8em' }}><use xlinkHref='#icon-huiyuan' /></svg>}
        onClick={() => hashHistory.push('/memberexclusive')}
        arrow="horizontal"
      >
        开通VIP
      </Item>
      <Item
        thumb={<svg className="icon" aria-hidden="true" style={{ width: '1.8em', height: '1.8em' }}><use xlinkHref='#icon-lingquanzhongxin' /></svg>}
        onClick={() => hashHistory.push('/my/coupon')}
        arrow="horizontal"
      >
        优惠券
      </Item>
      <Item
        thumb={<svg className="icon" aria-hidden="true" style={{ width: '1.8em', height: '1.8em' }}><use xlinkHref='#icon-qunliao' /></svg>}
        onClick={() => hashHistory.push('/join')}
        arrow="horizontal"
      >
        加入社群
      </Item>

      <Item
        thumb={<svg className="icon" aria-hidden="true" style={{ width: '1.8em', height: '1.8em', color: '#2fc2ba' }}><use xlinkHref='#icon-wo' /></svg>}
        onClick={() => hashHistory.push('/my/myinfo')}
        arrow="horizontal"
      >
        信息管理
      </Item>
    </List>
  );
};

export default UserPageList;
