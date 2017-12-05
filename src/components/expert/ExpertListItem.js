import React from 'react';
import { Button, List } from 'antd-mobile';
import { hashHistory } from 'react-router';
import { IMG_DOMAIN } from '../../utils/config';

const Item = List.Item;
const Brief = Item.Brief;

const ExpertListItem = ({ data }) => {
  return (
    <Item
      onClick={() => hashHistory.push(`/expert/${data.id}`)}
      align="top"
      thumb={<img style={{ width:'60px', height:'60px' }} src={`${IMG_DOMAIN}${data.profilePicture}`}/>}
      multipleLine
    >
      {data.name}
      <Brief>热度：{data.rank}</Brief>
    </Item>
  );
};

export default ExpertListItem;
