import React from 'react';
import { Button, List } from 'antd-mobile';
import { hashHistory } from 'react-router';
import { IMG_DOMAIN } from '../../../utils/config';

const Item = List.Item;
const Brief = Item.Brief;

const CouponStatus = ({ status }) => {
  switch (status) {
    case 0: return <span>禁用</span>;
    case 1: return <span>可用</span>;
    case 2: return <span>已删除</span>;
    case 3: return <span>已消费</span>;
    default: return <span>未知状态</span>;
  }
};

const CouponListItem = ({ data }) => {
  const {
    name, id, thumbNailImage, faceValue, changePoints, status,
  } = data;
  return (
    <Item
      align="top"
      thumb={<img style={{ width: '60px', height: '60px' }} src={`${IMG_DOMAIN}${thumbNailImage}`} />}
      multipleLine
      extra={<span>面值 <span style={{ color: 'red' }}>¥{faceValue / 100} </span></span>}
    >
      {name}
      <Brief>需要积分  {changePoints} (<CouponStatus status={status} />)</Brief>
    </Item>
  );
};

export default CouponListItem;
