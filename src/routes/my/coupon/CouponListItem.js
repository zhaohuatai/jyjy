import React from 'react';
import { Button, List } from 'antd-mobile';
import { hashHistory } from 'react-router';
import { IMG_DOMAIN } from "../../../utils/config";

const Item = List.Item;
const Brief = Item.Brief;

const CouponListItem = ({ data }) => {
  const {
    name, id, thumbNailImage, faceValue, changePoints
  } = data;
  return (
    <Item
      align="top"
      thumb={<img style={{ width: '60px', height: '60px' }} src={`${IMG_DOMAIN}${thumbNailImage}`} />}
      multipleLine
      extra={<span>面值 <span style={{ color: 'red' }}>¥{faceValue}</span></span>}
    >
      {name}
      <Brief>需要积分  {changePoints}</Brief>
    </Item>
  );
};

export default CouponListItem;
