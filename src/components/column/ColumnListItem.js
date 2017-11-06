import React from 'react';
import { Button, List } from 'antd-mobile';
import { hashHistory } from 'react-router';

const Item = List.Item;
const Brief = Item.Brief;

const ColumnListItem = ({ thumbnail, title, studying, volume, price, id }) => {
  return (
    <Item
      onClick={() => hashHistory.push(`/course/${id}`)}
      extra={<span style={{ color: 'red' }}>¥{price}</span>}
      align="top"
      thumb = {<img style={{ width:'60px', height:'60px' }} src={thumbnail}/>}
      multipleLine
    >
      {title}<Brief>期数({volume})  学习人({studying})</Brief>
    </Item>
  );
};

export default ColumnListItem;
