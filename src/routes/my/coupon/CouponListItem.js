import React from 'react';
import { Button, List } from 'antd-mobile';
import { hashHistory } from 'react-router';
import { IMG_DOMAIN } from "../../../utils/config";

const Item = List.Item;
const Brief = Item.Brief;

const CouponListItem = ({ data, doExchange }) => {
  const {
    name, id, thumbNailImage, faceValue, changePoints,
  } = data;
  return (
    <Item
      align="top"
      thumb={<img style={{ width: '60px', height: '60px' }} src={`${IMG_DOMAIN}${thumbNailImage}`} />}
      multipleLine
      extra={<Button size='small' type='primary' onClick={() => doExchange(id)}>兑换</Button>}
    >
      {name}
      <Brief>需要积分{changePoints} / 面值 <span style={{ color: 'red' }}>¥{faceValue/100}</span></Brief>
    </Item>
  );
};

export default CouponListItem;
