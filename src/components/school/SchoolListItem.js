import React from 'react';
import { Button, List } from 'antd-mobile';
import { hashHistory } from 'react-router';

const Item = List.Item;
const Brief = Item.Brief;

const SchoolListItem = ({ thumbnail, title, stage, id }) => {
  return (
    <Item
      onClick={() => hashHistory.push(`/school/${id}`)}
      key={id}
      align="top"
      thumb={<img style={{ width:'60px', height:'60px' }} src={thumbnail} />}
      multipleLine
    >
      {title}
      <Brief>{stage}</Brief>

    </Item>
  );
};

export default SchoolListItem;
