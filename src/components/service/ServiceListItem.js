import React from 'react';
import { Button, List } from 'antd-mobile';
import { hashHistory } from 'react-router';

const Item = List.Item;
const Brief = Item.Brief;

const ServiceSecondListItem = ({ data }) => {
  const { id, title, price, priceVIP, coverUrl, maxAppointCount, appointCount } = data;

  const extra = <div>数量{appointCount}/{maxAppointCount}</div>
  return (
    <Item
      onClick={() => hashHistory.push(`/service/${id}`)}
      key={id}
      extra={extra}
      thumb = {<img style={{ width:'60px', height:'60px' }} src={coverUrl}/>}
      multipleLine
      arrow="horizontal"
    >
      {title}
      <Brief>¥{price}／<span style={{color: 'red' }}>会员¥{priceVIP}</span> </Brief>
    </Item>
  );
};

export default ServiceSecondListItem;
