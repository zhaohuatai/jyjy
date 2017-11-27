import React from 'react';
import { Button, List } from 'antd-mobile';
import { hashHistory } from 'react-router';

const Item = List.Item;
const Brief = Item.Brief;

const ColumnListItem = ({ data }) => {
  const { coverUrl, title, favoriteCount, learningCount, id } = data;
  return (
    <Item
      onClick={() => hashHistory.push(`/column/${id}`)}
      align="top"
      thumb = {<img style={{ width:'60px', height:'60px' }} src={coverUrl}/>}
      multipleLine
    >
      {title}<Brief>期数({learningCount})  学习人({learningCount})</Brief>
    </Item>
  );
};

export default ColumnListItem;
